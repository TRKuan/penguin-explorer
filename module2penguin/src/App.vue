<template>
  <div id="app">
    <!-- <nav class="navbar">
      <span  @click="expand" class="navbar-toggle js-navbar-toggle" >
        <i class="fas fa-bars"></i>
        <p>+</p>
      </span>
      <auth/>
      <ul class="main-nav" id="js-menu">
        <li>
          <router-link to="/map" class="nav-links">Map</router-link>
        </li>
        <li>
          <router-link to="/profile" class="nav-links">Profile</router-link>
        </li>
      </ul>
    </nav> -->
    <div id="nav">
      <template v-if="user">
      <router-link to="/map">Map</router-link>
      |<router-link to="/profile">Profile</router-link>
      </template>
      <Auth/>
    </div>
    <router-view :key="$route.fullPath" id = "page_contents"/>
  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import { auth } from "@/firebaseConfig";

 export default {
  name: "App",
  components: {
    Auth
  },
  data() {
    return {
      user: null
    };
  },

  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  },

  // methods: {
  //   expand () {
  //     let mainNav = document.getElementById('js-menu');
  //     mainNav.classList.toggle('active');
  //   }

  // }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
