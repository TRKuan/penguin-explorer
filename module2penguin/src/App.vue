<template>
  <div>
    <ul id="nav" class="nav nav-pills">
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'map'}" class="nav-link">Map</router-link>
      </li>
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'wishlist'}" class="nav-link">Wishlist</router-link>
      </li>
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'profile'}" class="nav-link">Profile</router-link>
      </li>
      <li class="d-none d-md-block"><auth class="auth"/></li>
    </ul>
    <div id="app">
      <router-view :key="$route.fullPath" id = "page_contents"/>
    </div>
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
  }
};
</script>

<style>
/*general setting*/
* {
    box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  align: center;
}
/*app*/
#app {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 2rem;
}
@media (max-width: 767px/*sm*/) {
  #app {
    padding-top: 40px;
  }
}
/*nav bar*/
#nav {
  z-index: 1;
  width: 100%;
  background-color: rgb(228, 233, 255);
  justify-content: center;
  align-items: center;
  position: fixed;
}
@media (max-width: 767px/*sm*/) {
  #nav li{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    text-align: center;
  }
}
</style>
