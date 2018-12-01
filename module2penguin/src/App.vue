<template>
  <div id="app">
    <div id="nav">
      <template v-if="user">
      <router-link to="/map">Map</router-link>
      |<router-link to="/profile">Profile</router-link>
      </template>
      <Auth style="margin-left: 20px;"/>
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

#page_contents {
  padding-left:30px;
}
</style>
