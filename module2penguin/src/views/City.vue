<template lang="html">
  <div class="city">
    <google-map class="map" width="width:100%;" height="height: 35vh;" 
        ref="map" :page="this.$route.params.city"/>
    <city-info :name="this.$route.params.city" :starNum="starNum"/>
    <br />
    <div class="place-list list-group">
      <template v-for="(place, idx) in cityPlaces">
      <place-list-item :placeName="place.name" :key="idx" 
                        :visiteDate="place.visitedDate" :wishlisted="place.wishlisted" 
                        :visited="place.visited" :placeId="place.id"/>
      </template>
    </div>
  </div>
</template>

<script>
import CityInfo from '@/components/CityInfo.vue'
import PlaceListItem from '@/components/PlaceListItem.vue'
import GoogleMap from '@/components/GoogleMap.vue'
import { auth, users} from "@/firebaseConfig.js"
export default {
  name: 'City',
  components: {
    PlaceListItem,
    CityInfo, 
    GoogleMap
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
      cityPlaces: users.doc(auth.currentUser.uid).collection("places")
                  .where("cityName","==",this.$route.params.city)
                  .orderBy("visitedDate","desc")
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
.map {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.place-list {
  width: 100%;
  max-width: 700px;
}
</style>
