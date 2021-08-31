<template>
  <!-- START AUTH PAGE  -->
  <div class="container">
    <div class="met align-middle" center>
        <b-row class="justify-content-center">
          <b-col md="12">
            <h2 class="text-center mb-4">¡Welcome!</h2>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input 
                v-model="username" 
                id="inline-form-input-username" 
                placeholder="Type a username ... "
                @keyup.enter="username !== '' ? loginOrRegister() : null"
                ></b-form-input>
            </b-input-group>
            <div class="text-right">
              <b-button block class="mt-4" variant="success" pill @click="loginOrRegister" >Start Chatting</b-button>
            </div>
          </b-col>
        </b-row>
     </div>
  </div>
  <!-- END AUTH PAGE  -->
</template>

<script>
export default {
  name: 'Auth',
  data(){
    return {
      username: '',
    }
  },
  methods: {
    loginOrRegister(){
      if(this.username !== ''){
        this.$store.dispatch('login', {
          username: this.username.toLowerCase(),
        })
        .then(() => this.$router.push('/chat'))
        .catch((err) => {

          this.$store.dispatch('register', {
            username: this.username,
          })
          .then(() => this.$router.push('/chat'))
          .catch((err) => {     
            console.log(err);
          });
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
.container, .met{
  height: 100%;
}
.met {
  display: flex;
  align-items: center;
}
</style>

