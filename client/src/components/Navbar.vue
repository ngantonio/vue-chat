<template>
  <div>
    <!-- START BOOTSTRAP NAVBAR -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand href="#" class="ml-2">ChatApp</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ username }}</em>
            </template>
            <b-dropdown-item href="#" @click="Logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- END BOOTSTRAP NAVBAR -->
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
  props: {
    socket: null,
  },
  created(){
    this.username = this.getUser().username;
  },
  methods:{
    ...mapGetters(['getUser']),
    ...mapActions(['logout']),

    Logout(){
      this.logout()
      this.socket.emit('logout', (error) => {
        if(error) {
          console.log(error)
        }
      });
      // Se necesita recargar el navegador para que el servidor libere el socketId y renueve la conexión
      location.reload(); 
    }
  }
};
</script>

<style>

.navi{
   flex: 1;
}

</style>
