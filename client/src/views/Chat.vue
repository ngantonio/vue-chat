<template>
  <div>
  <Navbar />
 <div class="container">
    <b-row>
      <b-col md="6">
        <div class="outer__container">
          <div class="chat__container">
            <BarChat />
            <MessageList />
            <MessageInput />
          </div>
        </div>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </div>
</div>

</template>

<script>
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
};
</script>

<style>

</style>
