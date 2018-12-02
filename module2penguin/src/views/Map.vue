<template>
<div>

<GoogleMap/>

</div>
</template>

<script>
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
