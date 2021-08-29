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
             <span class="user__id">{{item.username}}</span>
            <p class="text__message">{{ item.text }}</p>

          </div>
          <span class="time pl-10"> {{ item.createdAt | format }}</span>

        </div>

     </div>
  </div>

</template>

<script>
import messageListArr from '@/utils/utils';
import { mapGetters } from 'vuex'
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

  created() {
    this.username_local = this.getUser().username;
    const username = this.username_local;

    socket.emit('join', { username }, (error) => {
      if(error) {
        console.log(error)
      }
    });
    this.listenNewMessages()
  },
  filters: {
    format(date) {
      return moment(date).format('hh:mm A');
    },
  },
  methods: {
    ...mapGetters(['getUser']),

    listenNewMessages(){
      socket.on("NEW_MESSAGE", fetchedData => {
        console.log("NUEVO EVENTO")
        this.messages.push(fetchedData)
        console.log(this.messages)
      })
    }

  }
};

</script>

<style>

</style>
