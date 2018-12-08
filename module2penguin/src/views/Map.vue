<template>
<div>

<google-map-with-search-box/>

</div>
</template>

<script>
import GoogleMapWithSearchBox from "@/components/GoogleMapWithSearchBox.vue"
export default {
  name: 'Map',
  components: {
    GoogleMapWithSearchBox,
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
