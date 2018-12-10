<template>
  <div>
    <div>
      <div>
        <div>
          <div class="subcontainer">
            <div v-if="mounted" class="penguin">
              {{ $refs.map.city }}:
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
        <google-map ref="map"/>
    </div>
    <!-- <place-list-item v-if="placeInfo" placeName="Place" visiteDate="9-11-2018" :visited="placeInfo"/> -->
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
      placeInfo: false,
      mounted: false
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
      console.log("current place", this.currentPlace.id);
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.$refs.map.addMarker(this.currentPlace, marker);
        this.$refs.autocomplete.$refs.input.value = "";
        this.currentPlace = null;
      }
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
