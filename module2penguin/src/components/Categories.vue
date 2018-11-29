<template>
<div>

<h3>Your Categories:</h3>
<router-link to="/todos"><p>all</p></router-link>
<span v-for="(category, idx) in userdoc.categories" :key="idx" >
    <p>|</p>
    <router-link v-if="!done" :to="'/todos/' + category"><p>{{category}}</p></router-link>
    <router-link v-else-if="done" :to="'/done/' + category"><p>{{category}}</p></router-link>
    <button @click="removeCategory(category)">X</button>
</span>
<form v-if="!done" v-on:submit.prevent="addCategory(category)">
  <input v-model="category" placeholder="New Category">
  <button type="submit">Add Category</button>
</form>

</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
export default {
  name: 'Categories',
  components: {
  },

  data() {
    return {
      userdoc: {},
      done: this.$parent.done,
    };
  },

  firestore() {
      return {
        userdoc: db.doc(`users/${auth.currentUser.uid}`),
      };

  },
  methods: {
    addCategory(category) {
      console.log(this.userdoc.categories);
      if(!this.userdoc.categories){
        this.userdoc.categories = [];
        db.doc(`users/${auth.currentUser.uid}`).set({ "categories": [] });
      }
      this.userdoc.categories.push(category)
      db.doc(`users/${auth.currentUser.uid}`).update({ "categories": this.userdoc.categories });
      this.category = "";
    },
    removeCategory(category) {
      var index = this.userdoc.categories.indexOf(category)
      if (index > -1){
        this.userdoc.categories.splice(index,1);
        db.doc(`users/${auth.currentUser.uid}`).update({ "categories": this.userdoc.categories });
      }
    },

  }

}
</script>
