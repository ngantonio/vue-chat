<template>
  <!-- START CHAT CONTAINER -->
  <div class="list__container" ref="chat_window">
    <div v-for="(item, index) in allMessages" :key="index">
        <div v-if="item.username === username_local" class="message__container justify__end">
          <span class="time pr-10"> {{ item.createdAt | format }}</span>
          <div class="message__box container__left" >
            <span class="user__id">You</span>
            <p class="messageText">{{ item.text }}</p>
          </div>
        </div>

        <div v-else class="message__container justify__start">
          <div class="message__box container__right">
            <span class="user__id">@{{item.username}}</span>
            <p class="text__message">{{ item.text }}</p>
          </div>
          <span class="time pl-10"> {{ item.createdAt | format }}</span>
        </div>
    </div>
  </div>
  <!-- END CHAT CONTAINER -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'
import moment from 'moment';
var socket = io.connect('http://localhost:4000');

export default {
  name: 'MessageList',
  data() {
    return {
      username_local: '',
    };
  },

  async created() {
    this.username_local = this.getUser().username;
    await this.getHistoricalMessages()
    this.joinRoom()
    this.listenNewMessages()
    this.listenToRoomUsers()
  },
  computed: mapGetters(['allMessages', 'searchContext']), 
  filters: {
    format(date) {
      const  today = moment(Date.now()).format('DD-MM-YYYY');
      const messageDate = moment(date).format('DD-MM-YYYY');

      return messageDate === today ?  moment(date).format('hh:mm A'):  messageDate;
    },
  },
  methods: {
    ...mapGetters(['getUser', 'onlineUsers']),
    ...mapActions(['setOnlineUsers', 'addNewMessage', 'setLiveChatContext']),

    scrollDown(){
      this.$nextTick(() => {
        let container = this.$refs["chat_window"];
        container.scrollTop = container.scrollHeight;
      });
     
    },
    listenNewMessages(){
      socket.on("NEW_MESSAGE", fetchedData => {
        /**
         * Si estoy en un contexto de busqueda, quiero que los mensajes que 
         * vayan llegando se almacenenen en otra lista, y que no se haga scroll
         * cada vez que vayan llegando
         */
        if(this.searchContext){
          this.addNewMessage(fetchedData)
        }else{
          this.addNewMessage(fetchedData)
          this.scrollDown()
        }
        
      })
    },
    /** Evento para unirse a la sala */
    joinRoom(){
      const username = this.username_local;
      socket.emit('join', { username }, (error) => {
        if(error) {
          console.log(error)
        }
      });
    },
    /** Obtiene todos los mensajes guardados en la base de datos */
    async getHistoricalMessages(){
      await this.$http
        .get('/messages/all')
        .then((resp) => {
          this.setLiveChatContext(resp.data.messages)
          this.scrollDown()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /** Listener para almacenar cada vez que usuario entra o sale del chat */
    listenToRoomUsers(){
      socket.on("LISTEN_ROOM", ( data ) => {
        this.setOnlineUsers(data.users)
      })
    },
  }
};

</script>
