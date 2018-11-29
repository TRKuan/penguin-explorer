<template>
<div>

<h3 v-if="!done">
  <h3 v-if="!todocat">Your To-dos:</h3>
  <h3 v-else-if="todocat">Your {{todocat}} To-dos:</h3>
  <form v-on:submit.prevent="addTodo(todo)">
    <input v-model="todo" placeholder="New Todo">
    <button type="submit">Add New Todo</button>
  </form>
</h3>
<h3 v-else-if="done">
  <h3 v-if="!todocat">Your Completed To-dos:</h3>
  <h3 v-else-if="todocat">Your Completed {{todocat}} To-dos:</h3>
</h3>

<div>
<div class = "todo_div" v-for="(todo, idx) in filteredTodos" :key="idx">
     <router-link class = "todo_link" :to="'/todo/' + todo.id">
       {{ todo.todo }}
     </router-link>
     <button v-if="!done" class = "done_button" @click="complete(todo.id)">Mark as Done</button>
     <p v-if="done" class = "done_marker">Done</p>
</div>
</div>

</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";

export default {
  name: 'TodoList',
  components: {
  },

  data() {
    return {
      done: this.$parent.done,
      todos: [],
      todocat: this.$route.params.category,
    };
  },

  firestore() {
      return {
        todos: db.doc(`users/${auth.currentUser.uid}`).collection("todos").orderBy("createdAt", "desc"),
      };
  },

  methods: {
    addTodo(todo) {
      const createdAt = new Date();
      if(!this.todocat){
        db.doc(`users/${auth.currentUser.uid}`).collection("todos").add({"todo":todo, "done": false, "createdAt": createdAt});
      } else {
        db.doc(`users/${auth.currentUser.uid}`).collection("todos").add({"todo":todo, "done": false, "createdAt": createdAt, "category":this.todocat});
      }
      this.todo = "";
    },
    complete(id) {
      db.doc(`users/${auth.currentUser.uid}/todos/${id}`).update({"done": true});
    },
  },
  computed: {
    filteredTodos: function () {
      var filtered = [];
      for (var i = 0; i < this.todos.length; i++){
        var todo = this.todos[i];
        if (todo.done == this.done && (!this.todocat || todo.category == this.todocat)) {
          filtered.push(todo)
        }
      }
      return filtered;
    }

  }

}
</script>

<style>
ul{
width: 90%;
list-style: none;
}
.todo_div {
padding: .5em;
display: flex;

}
.todo_div:hover{
 background-color:lightgrey;
}
.done_button {
margin: 0px;
float: left;
}
.todo_link {
 width: 75%;
 white-space: nowrap;
 overflow-x: hidden;
 text-overflow: ellipsis;
 margin: 0px;
 text-decoration: none;
 float: left;
}
</style>
