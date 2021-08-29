<template>
  <div>
  <Navbar />
 <div class="container">
    <b-row>
      <b-col md="6">
        <div class="outer__container">
          <div class="chat__container">
            <BarChat />
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
import MessageInput from '@/components/MessageInput.vue';

export default {
  components: {
    Navbar,
    BarChat,
    MessageInput,
  },
};
</script>

<style>

</style>
