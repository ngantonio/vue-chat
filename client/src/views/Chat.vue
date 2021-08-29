<template>
  <div>
  <Navbar />
 <div class="container">
    <b-row>
      <b-col md="4" offset="2">
        <div class="outer__container">        
          <b-list-group>
            <b-list-group-item v-for="(user, index) in onlineUsers" :key="index">@{{ user.username }}</b-list-group-item>
            
          </b-list-group>
        </div>
      </b-col>
      <b-col lg="6" md="8">
        <div class="outer__container">
          <div class="chat__container">
            <BarChat />
            <MessageList />
            <MessageInput />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar.vue';
import BarChat from '@/components/BarChat.vue';
import MessageList from '@/components/MessageList.vue';
import MessageInput from '@/components/MessageInput.vue';

export default {
  components: {
    Navbar,
    BarChat,
    MessageList,
    MessageInput,
  },
  computed: mapGetters(['onlineUsers']), 

};
</script>


