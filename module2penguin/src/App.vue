<template>
  <div id="app">
    <ul id="nav" class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/map" class="nav-link">Map</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">Profile</router-link>
      </li>
      <li class="d-none d-md-block"><auth class="auth"/></li>
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
/*general setting*/
* {
    box-sizing: border-box;
}
html, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*nav bar*/
#nav {
  width: 100%;
  z-index: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991.98px/*md*/) {
  #nav {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  #nav li{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    text-align: center;
  }
}

</style>
