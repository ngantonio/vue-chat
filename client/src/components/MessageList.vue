<template>

   <div class="list__container">
     <div v-for="(item, index) in messages" :key="index">
       
        <div v-if="item.username === username_local" class="message__container justify__end">
          <span class="time pr-10"> {{ item.createdAt | format }}</span>
          <div class="message__box container__left">
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
      messages: [],
      username_local: ''
    };
  },

  async created() {
    this.username_local = this.getUser().username;
    await this.getHistoricMessages()
    this.roomJoin()
    this.listenNewMessages()
    this.listenToRoomUsers()
  },
  filters: {
    format(date) {
      const  today = moment(Date.now()).format('DD-MM-YYYY');
      const messageDate = moment(date).format('DD-MM-YYYY');

      return messageDate === today ?  moment(date).format('hh:mm A'):  messageDate;
    },
  },
  methods: {
    ...mapGetters(['getUser', 'onlineUsers']),
    ...mapActions(['setOnlineUsers']),

    listenNewMessages(){
      socket.on("NEW_MESSAGE", fetchedData => {
        this.messages.push(fetchedData)
      })
    },
    roomJoin(){
      const username = this.username_local;
      socket.emit('join', { username }, (error) => {
        if(error) {
          console.log(error)
        }
      });
    },
    async getHistoricMessages(){
      await this.$http
        .get('/messages/all')
        .then((resp) => {
          this.messages = resp.data.messages;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    listenToRoomUsers(){
      socket.on("LISTEN_ROOM", ( data ) => {
        this.setOnlineUsers(data.users)
      })
    },

  }
};

</script>

<style>

</style>
