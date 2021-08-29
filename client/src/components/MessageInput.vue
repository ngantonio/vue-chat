<template>
  <div class="form">
    <input
      class="input"
      type="text"
      placeholder="Type a message ..."
      v-model="textMessage"
      @keyup.enter="sendMessage"

    />
    <button
      type="button"
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
        this.$http
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
      }else{
        console.log("no se puede enviar un mesaje vacio")
      }
    }
    
  }
};

</script>

<style>

</style>
