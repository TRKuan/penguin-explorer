<template>
  <div id="app">
    <ul id="nav" class="nav nav-pills justify-content-center">
      <li class="nav-item">
        <router-link to="/map" class="nav-link">Map</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">Profile</router-link>
      </li>
    </ul>
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

@media (max-width: 991.98px/*md*/) {
  #nav li{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    text-align: center;
  }
}


</style>
