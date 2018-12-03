<template>
  <div class="auth">

    <template v-if="!user">
      <a href @click.prevent="signInWithGoogle">Sign in with Google</a>
    </template>

    <template v-if="user">
      <img :src="user.photoURL" alt="avatar" class="d-none d-md-inline-block" style="width: 30px; height: 30px; border-radius: 50%;">
      <a href @click.prevent="signOut">Sign Out</a>
    </template>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";

export default {
  name: "auth",

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

  methods: {
    signInWithGoogle: function() {
      auth
        .signInWithRedirect(provider)
        .then(result => {
          this.user = result.user;
          console.log("?", this.user);
        })
        .catch(err => console.log(err));
    },
    signOut: function() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
        })
        .catch(err => console.log(err));
        location.href = '/';
    }
  }
};

</script>

<style scoped>
div.auth {
  display: inline-block;
  padding: 10px;
}
</style>
