<template>
  <div class="main">
    <ul id="nav" class="nav nav-pills">
      <li class="brand d-none d-md-block">PenguinExplorer</li>
      <li v-if="$route.path==='/'" class="brand d-block d-md-none">PenguinExplorer</li>
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'map'}" class="nav-link">Map</router-link>
      </li>
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'places'}" class="nav-link">Places</router-link>
      </li>
      <li v-if="user" class="nav-item">
        <router-link :to="{name:'profile'}" class="nav-link">Profile</router-link>
      </li>
      <li class="auth d-none d-md-block"><auth class="auth"/></li>
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
button.btn-primary {
  background-color: rgb(37, 53, 103);
  color: white;
  border: rgb(37, 53, 103);
}
button.btn-primary:focus { outline:0; }
button.btn-primary:hover, .btn-primary:focus{
  background-color: rgb(42, 60, 120);
  color: white;
}
button.btn-primary:active{
  background: rgb(37, 53, 103);
  color: white;
}
/*app*/
.main {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  padding-top: 50px;
}
@media (max-width: 767px/*sm*/) {
  #app {
    padding-top: 40px;
  }
}
/*nav bar*/
#nav {
  z-index: 2;
  width: 100%;
  height: 50px;
  background-color: rgb(37, 53, 103);
  justify-content: center;
  align-items: center;
  position: fixed;
}
@media (max-width: 767px/*sm*/) {
  #nav {
    height: 40px;
  }
}
#nav a {
  color: white;
}
#nav .nav-link.active {
  background-color: green;
}
#nav .brand {
  margin-right: auto;
  margin-left: 0.5rem;
  color: white;
  font-size: 1.2rem;
}
#nav .auth {
  margin-left: auto;
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
