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
  name: 'Todos',
  components: {
    Categories,
    TodoList
  },

  data() {
    return {
      done: false,
    };
  },
}
</script>

<style>
p {
 padding: 5px;
 display: -webkit-inline-box;
 margin: 0px;
}
</style>
