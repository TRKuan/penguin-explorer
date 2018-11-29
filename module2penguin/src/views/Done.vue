<template>
<div>

<Categories/>
<TodoList/>

</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import Categories from "@/components/Categories.vue"
import TodoList from "@/components/TodoList.vue"

export default {
  name: 'Done',
  components: {
    Categories,
    TodoList
  },
  data() {
    return {
      done: true,
    };
  },

  beforeCreate: function() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push('/');
      }
    });
  },


  firestore() {
      return {
        todos: db.doc(`users/${auth.currentUser.uid}`).collection("todos").orderBy("createdAt", "desc"),
        userdoc: db.doc(`users/${auth.currentUser.uid}`),
      };

  },
}
</script>

<style>
.done_marker {
float: right;
margin: 0px;
}
p {
 padding: 5px;
 display: -webkit-inline-box;
 margin: 0px;
}
.todo_link {
 width: 70%;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 margin: 0px;
 display: -webkit-inline-box;
}
</style>
