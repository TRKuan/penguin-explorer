<template lang="html">
  <div class="city">
    <city-info :name="cityInfo.name" :starNum="cityInfo.starNum"/>
    <br />
    <div class="place-list list-group">
      <template v-for="(place, idx) in cityPlaces">
      <place-list-item :placeName="place.cityName" :key="idx" :visiteDate="place.date"/>
      </template>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="false"/>
      <place-list-item placeName="Place2" visiteDate="2-21-2018" :visited="false"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="false"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="false"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="false"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017" :visited="true"/>
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
      cityInfo: users.doc(auth.currentUser.uid)
                  .collection("cities").doc(this.$route.params.city),
      cityPlaces: users.doc(auth.currentUser.uid)
                  .collection("cities").doc(this.$route.params.city).collection("places")
    };
  },
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
