<template lang="html">
  <PlaceSummary v-on:toggleWishlist="toggleWishlist" :placeDoc="PlaceDoc"/>
</template>

<script>
/* eslint-disable */
import PlaceSummary from '@/components/PlaceSummary.vue'
import {auth, users} from "@/firebaseConfig.js"
export default {
  name: 'Place',
  components: {
    PlaceSummary,
  },
  data() {
    return {
      DocID: this.$route.params.id,
      PlaceDoc: null,
    }
  },

  firestore() {
    var doctemp = users.doc(auth.currentUser.uid).collection("places").doc(this.DocID);
    return {
      PlaceDoc: users.doc(auth.currentUser.uid).collection("places").doc(this.DocID),
    }
  },
  methods: {
    toggleWishlist (val){
      users.doc(auth.currentUser.uid).collection("places").doc(this.PlaceDoc.id).update({wishlisted: val})
      this.PlaceDoc.wishlisted = val;
    },
  }

}
</script>

<style lang="css" scoped>
</style>
