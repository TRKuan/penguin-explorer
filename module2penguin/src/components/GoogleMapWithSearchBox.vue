<template>
  <div>
    <div>
      <div>
        <div>
          <div class="subcontainer">
            <div v-if="mounted" class="penguin">
              {{ $refs.map.city.split("_")[0].replace(/-/g," ")}}:
              <img class="penguin-icon" src="../assets/penguin.png" alt="penguin"> {{ $refs.map.penguin }}
            </div>
            <div class="search">
              <gmap-autocomplete
                :types="['establishment']"
                ref="autocomplete"
                @place_changed="setPlace">
              </gmap-autocomplete>
              <button @click="addMarker">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <div>
        <google-map
          ref="map" width="width:100%;" height="height: 86vh;"
          v-on:showPlace="showPlace" page="home"/>
    </div>
    <template v-if="PlaceDoc">{{this.PlaceDoc.placeName}}</template>
      <div v-if="showSummary && PlaceDoc" id = "placeSummaryDiv">
      <PlaceSummary v-on:toggleWishlist="toggleWishlist" :placeDoc="PlaceDoc"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { auth, users} from "@/firebaseConfig.js"
import {gmapApi} from 'vue2-google-maps'
import PlaceSummary from './PlaceSummary.vue'
import GoogleMap from './GoogleMap.vue'
import moment from 'moment'
export default {
  name: "GoogleMapWithSearchBox",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      map: null,
      center: { lat: 45.508, lng: -73.587 },
      city: "Montreal",
      markers: [],
      penguin: 0,
      places: [],
      currentPlace: null,
      mounted: false,
      placeInfo: false,
      showSummary: false,
      PlaceDoc :{},
      PlaceIndex: null,
    };
  },

  components: {
    PlaceSummary,
    GoogleMap
  },

  mounted() {
    this.mounted = true;
  },

  firestore() {
    if (auth.currentUser) {
      return {
          markers: users.doc(auth.currentUser.uid).collection("places")
      };
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {

      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        this.$refs.map.addMarker(this.currentPlace);
        this.$refs.autocomplete.$refs.input.value = "";
        this.currentPlace = null;
      }
    },
    hidePlace(){
      this.showSummary = false;
    },
    showPlace(index) {
      // Parse data for showing place here
      this.showSummary = true;
      this.PlaceDoc = this.markers[index];
      this.PlaceIndex = index;
    },

    toggleWishlist (val){
      users.doc(auth.currentUser.uid).collection("places").doc(this.PlaceDoc.id).update({wishlisted: val})
      this.PlaceDoc.wishlisted = val;
    },
  }
};
</script>

<style>
.penguin {
  float: right;
  margin: 0.3rem;
}
.penguin-icon {
  height: 2rem;
  width: 2rem;
  margin-bottom: 0.3rem;
}
.search {
  display: inline-block;
  margin: 0.3rem;
}

.subcontainer {
  width: 100%;
  flex-direction: row;
}
</style>
