<template lang="html">
  <div class="places">
    <h1 class="title">Places</h1>
    <p class="discription" v-if="cities.length===0">No place has been added. Add a place you've visited from the map!</p>
    <template v-for="city in cities" >
    <router-link :to="{name:'city', params:{city:city.cityName}}" class="city">
      <h2 class="cityName">{{city.cityName.replace(/-/g," ").replace(/_/g,", ")}}</h2></router-link>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
      {{places.filter(c=>c.cityName==city.cityName && c.visited == true).length}}
    </div>
    <div class="place-list list-group">
      <template v-for="place in places.filter(c=>c.cityName==city.cityName)">
        <place-list-item  :place="place ":placeName="place.name" :visiteDate="place.visitedDate" :placeId="place.id" :visited="place.visited" :wishlisted="place.wishlisted"/>
      </template>
    </div>
    <br/>
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
    users.doc(auth.currentUser.uid).collection("cities")
          .where("places", "==", 0).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
    return {
      places: users.doc(auth.currentUser.uid).collection("places").orderBy("visitedDate", "desc"),
      cities: users.doc(auth.currentUser.uid).collection("cities").orderBy("places", "desc")
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
.discription {
  text-align: center;
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
.cityName{
  white-space:normal;
  text-align: center;
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
