<template>
  <div class="form">
    <input
      class="input"
      type="text"
      placeholder="Type a message ..."
      v-model="textMessage"
      @keyup.enter="textMessage !== ''? sendMessage() : null"

    />
    <button
      type="button"
      :disabled="textMessage === ''"
      @click="sendMessage"
      class="send__btn">
      Send
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MessageInput',
  data(){
    return {
      textMessage: '',
    }
  },
  created(){
    this.username = this.getUser().username;
  },
  methods:{
    ...mapGetters(['getUser']),

    async sendMessage(){
      if(this.textMessage !==  ''){
        await this.$http
          .post('/messages/create', {
            username: this.getUser().username,
            text: this.textMessage,
          })
          .then((resp) => {
            // console.log(resp.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.textMessage = '';
      }
    }
    
  }
};

</script>

<style>

</style>
