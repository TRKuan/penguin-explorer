<template>
  <div class="home">
  <h2>Katie's To-do App</h2>
  <h3>login to get started</h3>
  <auth />

  </div>
</template>

<script>
import Auth from "@/components/Auth.vue";
import { auth, provider } from "@/firebaseConfig";

export default {
  name: 'home',
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
        console.log("redirect");
        this.$router.push('/map');
      }
    });
  },
}
</script>
