<template>
<div>



<h3 class = "title" v-if="this.tododoc.done">Done:</h3>
<h3 class = "title" v-if="!this.tododoc.done">To-do:</h3>
<p id = "cat" v-if="this.tododoc.category && this.userdoc.categories.indexOf(this.tododoc.category)>-1">
Category: {{this.tododoc.category}}</p>

<div v-if = "!this.editing">
  <p>{{this.tododoc.todo}}</p>
  <br>
  <button v-if="!this.tododoc.done" @click="complete()">Mark as Done</button>
  <button @click="showForm()"> Edit </button>
</div>
<form v-if = "this.editing" id = "editForm" v-on:submit.prevent="edit(todo)">
  <textarea v-model="todoEdited.todo"></textarea><br>
  <select v-model="todoEdited.category">
    <option selected>None</option>
    <option v-for="(category, idx) in userdoc.categories">{{category}}</option>
  </select>
  <button type="submit">Save</button>
  <button @click="hideForm()">Cancel</button>
</form>

</div>
</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
export default {
  name: 'Todos',
  data() {
    return {
      user: null,
      todoid: this.$route.params.id,
      tododoc: {},
      editing: false,
      todoEdited: {},
      userdoc: {}
    };
  },

  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.$router.push('/');
      }
    });
  },


  firestore() {
    console.log("firestore id", this.todoid);
    if (auth.currentUser){
      var userid = auth.currentUser.uid;
      return {tododoc: db.doc(`users/${userid}/todos/${this.todoid}`),
              todoEdited: db.doc(`users/${userid}/todos/${this.todoid}`),
              userdoc: db.doc(`users/${userid}`)};

    }
  },

  methods: {
    edit(todo) {
      const createdAt = new Date();
      var userid = auth.currentUser.uid;
      db.doc(`users/${userid}/todos/${this.todoid}`).update({
          "todo":this.todoEdited.todo,
          "category":this.todoEdited.category,
          "createdAt": createdAt

        });
      this.editing = false;
    },
    complete(id) {
      console.log(id);
    },
    showForm() {
      if(!this.todoEdited.category || this.userdoc.categories.indexOf(this.todoEdited.category) < 0) {
        this.todoEdited.category="None";
      }
      this.editing = true;
    },
    hideForm() {
      this.editing = false;
      this.todoEdited.todo = this.tododoc.todo;
    },
    complete() {
      db.doc(`users/${auth.currentUser.uid}/todos/${this.tododoc.id}`).update({"done": true});
    }

  }

}
</script>

<style>
textarea{
width: 90%;
height: 3em;
}
#cat {
margin-top: 0px;
font-size: .8em;
}
.title {
margin-bottom: 0px;
}

</style>
