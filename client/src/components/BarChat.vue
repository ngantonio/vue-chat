<template>
  <!-- START STATUS/SEARCH BAR -->
  <div v-if="!showSearchBar" class="bar">
    <div class="bar__info__left">
      <img class="online__icon" src="../assets/images/onlineIcon.png" alt="icon" />
      <p>Live Chat</p>
    </div>
    <div class="bar__info__right">
      <b-button pill variant="success" @click="searchBtn">
        <b-icon-search></b-icon-search>
      </b-button>
    </div>
  </div>
  <div v-else class="bar__search">
    <b-row class="">
      <b-col lg="3" md="4"  xs="2">
        <b-button pill variant="secondary" @click="backBtn">
          <b-icon-arrow-left-circle></b-icon-arrow-left-circle>
        </b-button>
      </b-col>
     
      <b-col lg="6" md="4"  xs="2">
        <b-form-input 
          type="text" 
          v-model="searchText"
          placeholder="Type a word and press search ..." 
          size="sm"
          @keyup.enter="searchText !== ''? goSearch() : null"
          > 
          </b-form-input>
      </b-col>

      <b-col lg="3" md="4"  xs="2" align="right">
        <b-button pill variant="success" @click="goSearch">
          <b-icon-search></b-icon-search>
        </b-button>
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
