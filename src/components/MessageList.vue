<template>

   <div class="list__container">
     <div v-for="(item, index) in messages" :key="index">

        <div v-if="item.name === 'gabo'" class="message__container justify__end">
          <div class="message__box container__left">
            <span class="user__id">You</span>
            <p class="messageText">{{ item.message }}</p>
          </div>
        </div>

        <div v-else class="message__container justify__start">
          <div class="message__box container__right">
             <span class="user__id">{{item.name}}</span>
            <p class="text__message">{{ item.message }}</p>

          </div>
          <span class="time pl-10">Hora</span>
        </div>

     </div>
  </div>

</template>

<script>
import messageListArr from '@/utils/utils';

export default {
  name: 'MessageList',

  data() {
    return {
      messages: [],
    };
  },

  created() {
    this.messages = messageListArr;
  },
};

</script>

<style>

</style>
