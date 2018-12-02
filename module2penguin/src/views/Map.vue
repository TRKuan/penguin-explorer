<template>
<div>

<GoogleMap/>

</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import GoogleMap from "@/components/GoogleMap.vue"
export default {
  name: 'Map',
  components: {
    GoogleMap,
  },

  data() {
    return {
      done: false,
    };
  },

  computed() {
    
  },

  methods() {
  }
}
</script>

<style>
p {
 padding: 5px;
 display: -webkit-inline-box;
 margin: 0px;
}
</style>
