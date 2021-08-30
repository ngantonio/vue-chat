<template>
  <!-- START STATUS/SEARCH BAR -->
  <div v-if="!showSearchBar" class="bar">
    <div class="bar__info__left">
      <p>Live Chat</p>
    </div>
    <div class="bar__info__right">
      <button @click="searchBtn">Search</button>
    </div>
  </div>
  <div v-else class="bar__search">
    <b-row class="">
      <b-col lg="3" md="4"  xs="2">
        <button @click="backBtn" >Back</button>
      </b-col>

      <b-col lg="6" md="4"  xs="2">
        <input type="text" v-model="searchText" class="input-group">
      </b-col>

      <b-col lg="3" md="4"  xs="2" align="right">
        <button @click="goSearch">Go</button>
      </b-col>
    </b-row>

  </div>
  <!-- END STATUS/SEARCH BAR -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BarChat',
  props: {
    msg: String,
  },
  data(){
    return{
      showSearchBar: false,
      searchText: ''
    }
  },
  created(){

  },
  methods:{
    ...mapActions(['setOnlineUsers', 'setSearchContext', 'switchContext']),
    backBtn(){
      this.showSearchBar = false
      this.switchContext();
    },

    searchBtn(){
      this.showSearchBar = true
    },
    async goSearch(){
      if(this.searchText !== ''){
        await this.$http
          .get(`/messages/search?query=${this.searchText}`)
          .then((resp) => {
            this.setSearchContext(resp.data.result)
          })
          .catch((err) => {
            this.$bvToast.toast(`There are no matches for "${this.searchText}"`, {
              title: 'Info',
              variant: 'info',
              solid: true,
            })
          });
        this.searchText = ''
      }
    }
  }

};
</script>
