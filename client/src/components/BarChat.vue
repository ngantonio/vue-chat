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

    backBtn(){
      this.showSearchBar = false
    },

    searchBtn(){
      this.showSearchBar = true
    },
    async goSearch(){
      if(this.searchText !== ''){
        await this.$http
          .get(`/messages/search?query=${this.searchText}`)
          .then((resp) => {
            console.log(resp.data.result)
          })
          .catch((err) => {
            console.log(err);
          });

          this.searchText = ''
      }
    }
  }

};
</script>
