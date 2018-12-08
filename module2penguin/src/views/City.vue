<template lang="html">
  <div class="city">
    <city-info :name="this.$route.params.city" :starNum="starNum"/>
    <br />
    <div class="place-list list-group">
      <template v-for="(place, idx) in cityPlaces">
      <place-list-item :placeName="place.name" :key="idx" :visiteDate="place.visitedDate" :visited="place.visited" :placeId="place.id"/>
      </template>
    </div>
  </div>
</template>

<script>
import CityInfo from '@/components/CityInfo.vue'
import PlaceListItem from '@/components/PlaceListItem.vue'
import { auth, users} from "@/firebaseConfig.js"
export default {
  name: 'City',
  components: {
    PlaceListItem,
    CityInfo
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      cityInfo: null,
      cityPlaces: []
    };
  },
  firestore() {
    return {
      cityPlaces: users.doc(auth.currentUser.uid)
                  .collection("places").where("cityName","==",this.$route.params.city)
    };
  },
  computed:{
    starNum(){
      return this.cityPlaces.filter(c=>c.visited==true).length
    },
    visited(){
      return this.cityPlaces.filter(c=>c.visited==true)
    },
    wishlist(){
      return this.cityPlaces.filter(c=>c.wishlist==true)
    }
  }
}
</script>

<style lang="css" scoped>
.city {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 2rem;
}
.place-list {
  width: 100%;
  max-width: 700px;
}
</style>
