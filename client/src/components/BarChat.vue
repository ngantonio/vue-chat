<template>
  <!-- START STATUS/SEARCH BAR -->
  <div v-if="!showSearchBar" class="bar">
    <div class="bar__info__left">
      <img class="online__icon" src="../assets/images/onlineIcon.png" alt="icon" />
      <p>Live Chat</p>
    </div>
    <div class="bar__info__right">
      <div @click="searchBtn" class="icon__container">
        <b-icon-search></b-icon-search>
      </div>
    </div>
  </div>
  <div v-else class="bar__search">
    <b-row class="">

      <b-col xs="2" md="3" lg="2">
        <div @click="backBtn" class="icon__container">
          <b-icon-arrow-left-circle></b-icon-arrow-left-circle>
        </div>
      </b-col>
     
      <b-col sm="8" md="6" lg="9" >
        <input 
          type="text" 
          v-model="searchText"
          class="input__search"
          placeholder="Type a word and press enter ..." 
          @keyup.enter="searchText !== ''? goSearch() : null"> 
      </b-col>
    </b-row>
  </div>
  <!-- END STATUS/SEARCH BAR -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BarChat',
  data(){
    return{
      showSearchBar: false,
      searchText: ''
    }
  },
  methods:{
    ...mapActions(['setOnlineUsers', 'setSearchContext', 'switchContext']),
    backBtn(){
      this.showSearchBar = false
      this.switchContext();
    },
    /** Controla la polivalencia de la barra del chat */
    searchBtn(){
      this.showSearchBar = true
    },
    /** Se ejecuta la búqueda de la que el usuario haya escrito en el input */
    async goSearch(){
      if(this.searchText !== ''){
        await this.$http
          .get(`/messages/search?query=${this.searchText}`)
          .then((resp) => {
            this.setSearchContext(resp.data.result)
          })
          .catch((err) => {
           const notFoundMessage = [{ username: 'admin', text: `Sorry, there are no coincidences for "${this.searchText}" 🙁. Press back button to return to chat`, createdAt: new Date }];
           this.setSearchContext(notFoundMessage);
          });
        this.searchText = ''
      }
    }
  }

};
</script>
