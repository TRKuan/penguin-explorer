<template lang="html">
  <div class="places">
    <h1 class="title">Places</h1>
    <template v-for="city in cities" >
    <router-link :to="{name:'city', params:{city:city.cityName}}" class="city">
      <h2>{{city.cityName.replace(/-/g," ")}}</h2></router-link>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
      {{places.filter(c=>c.cityName==city.cityName).length}}
    </div>
    <div class="place-list list-group">
      <template v-for="place in places.filter(c=>c.cityName==city.cityName)">
      <place-list-item  :place="place ":placeName="place.name" :visiteDate="place.visitedDate" :visited="place.visited"/>
      </template>
    </div>
    <br />
    </template>
    
  </div>
</template>

<script>
import PlaceListItem from '@/components/PlaceListItem.vue'
import {auth, users} from "@/firebaseConfig.js"
export default {
  name: 'Places',
  components: {
    PlaceListItem
  },
  data() {
    return {
      places: [],
      cities: []
    };
  },
  firestore() {
    return {
      places: users.doc(auth.currentUser.uid).collection("places"),
      cities: users.doc(auth.currentUser.uid).collection("cities")
    };
  },
}
</script>

<style lang="css" scoped>
.places {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 2rem;
}
.title {
  margin-bottom: 2rem;
}
.city {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.city h2{
  margin-bottom: 0;
}
.list-group {
  width: 100%;
  max-width: 600px;
}
a {
  color: black;
}
div.penguin {
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.penguin-icon {
  height: 2rem;
  width: 2rem;
  margin-right: 0.3rem;
}
</style>
