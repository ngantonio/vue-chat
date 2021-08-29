<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-2">ChatApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="#" @click="Logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  
  name: 'Navbar',
  data(){
    return {
      username: '',
    }
  },
  created(){
    this.username = this.getUser().username;
  },
  methods:{
    ...mapGetters(['getUser']),
    ...mapActions(['logout']),

    Logout(){
      this.logout()
      this.$router.push('/')
    }
  }
};
</script>

<style>

.navi{
   flex: 1;
}

</style>
