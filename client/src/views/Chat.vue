<template>
  <div>
  <Navbar :socket="socket" />
  <!-- START CHAT PAGE  -->
  <div class="container">
    <b-row>
      <b-col md="4" class="users__col">
        <div class="outer__container">        
          <b-list-group>
            <b-list-group-item v-for="(user, index) in onlineUsers" :key="index">
              <img style="margin-right: 5px;" src="../assets/images/onlineIcon.png" alt="icon" />@{{ user.username }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col lg="8" md="8" >
        <div class="outer__container">
          <div class="chat__container">
            <BarChat />
            <MessageList :socket="socket" />
            <MessageInput />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
  <!-- END CHAT PAGE  -->
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue';
import BarChat from '@/components/BarChat.vue';
import MessageList from '@/components/MessageList.vue';
import MessageInput from '@/components/MessageInput.vue';
import io from 'socket.io-client'

export default {
  components: {
    Navbar,
    BarChat,
    MessageList,
    MessageInput,
  },
  data(){
    return{
      socket: null
    }
  },
  created(){
    this.socket = io.connect(process.env.VUE_APP_API_URL);
  },

  computed: mapGetters(['onlineUsers']), 

};
</script>


