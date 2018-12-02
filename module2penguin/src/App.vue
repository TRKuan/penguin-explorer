<template>
  <div>
    <ul id="nav" class="nav nav-pills">
      <li class="nav-item">
        <router-link :to="{name:'map'}" class="nav-link">Map</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name:'profile'}" class="nav-link">Profile</router-link>
      </li>
      <li class="d-none d-md-block"><auth class="auth"/></li>
    </ul>
    <div id="app" class="container">
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
  padding-top: 1rem;
}
@media (max-width: 767px/*md*/) {
  #app {
    padding: 0;
  }
}
/*nav bar*/
#nav {
  z-index: 1;
  width: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
}
@media (max-width: 767px/*md*/) {
  #nav {
    position: fixed;
    left: 0;
    bottom: 0;
  }
  #nav li{
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    text-align: center;
  }
}

</style>
