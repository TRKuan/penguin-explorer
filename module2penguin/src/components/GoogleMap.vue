<template>
  <gmap-map
    ref="map"
    :position="google"
    :center="center"
    :zoom="12"
    style="width:100%;  height: 75vh;"
    >
    <div :key="index"
        v-for="(m, index) in markers">
        <gmap-marker
          v-if="m.wishlisted"
          :position="m.marker"
          :clickable="true"
          :icon="{
            url: require('../assets/heart.png'),
            size: {width: 46, height: 46, f: 'px', b: 'px'},
            scaledSize: {width: 40, height: 40, f: 'px', b: 'px'}
          }"
          @click="showPlace(index)">
        </gmap-marker>
        <gmap-marker
          v-else-if="m.visited"
          :position="m.marker"
          :clickable="true"
          :icon="{
            url: require('../assets/penguin.png'),
            size: {width: 46, height: 46, f: 'px', b: 'px'},
            scaledSize: {width: 45, height: 45, f: 'px', b: 'px'}
          }"
          @click="showPlace(index)">
        </gmap-marker>
        <gmap-marker
          v-else
          :position="m.marker"
          :clickable="true"
          @click="showPlace(index)">
        </gmap-marker>
    </div>
  </gmap-map>
</template>

<script>
/* eslint-disable */
import { auth, users} from "@/firebaseConfig.js"
import {gmapApi} from 'vue2-google-maps'
import PlaceSummary from './PlaceSummary.vue'
import moment from 'moment'
export default {
  name: "GoogleMap",
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
    };
  },

  components: {
    PlaceSummary
  },

  computed: {
    google: gmapApi
  },

  mounted() {
    this.geolocate();
    users.doc(auth.currentUser.uid).get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              users.doc(auth.currentUser.uid).set({
                userid:auth.currentUser.uid,
                photo: auth.currentUser.photoURL,
                name: auth.currentUser.displayName
                })
            }
    });
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
    addMarker(currentPlace) {
      if (currentPlace) {
        const marker = {
          lat: currentPlace.geometry.location.lat(),
          lng: currentPlace.geometry.location.lng()
        };
        // this.markers.push({ position: marker });
        this.places.push(currentPlace);
        this.center = marker;

        var query = users.doc(auth.currentUser.uid).collection("places")
              .where("visited", "==", false)
              .where("wishlisted", "==", false);
        let self = this;
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
          self.addPlace(currentPlace, false, false)
        });        
      }
    },
    getCityName(address){
      let addressArray = address.split(", ")
      let l = addressArray.length
      return addressArray[l-3].replace(/ /g, '-')+"-"
            +addressArray[l-2].split(' ')[0]+"-"
            +addressArray[l-1].replace(/ /g, '-')
    },
    addPlace(currentPlace, visit, wishlist){
        const name = currentPlace.name
        const address = currentPlace.formatted_address
        const visited = visit;
        const wishlisted = wishlist;
        const cityName = this.getCityName(address)
        const marker = {
          lat: currentPlace.geometry.location.lat(),
          lng: currentPlace.geometry.location.lng()
        };
        console.log(currentPlace)
        users.doc(auth.currentUser.uid).collection("cities").doc(cityName).get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
              users.doc(auth.currentUser.uid).collection("cities").add({cityName})
            }
        });
        users.doc(auth.currentUser.uid).collection("places")
              .add({name, address,cityName,marker,visited,wishlisted,visitedDate:moment().format('MM-DD-YYYY')})
    },

    showPlace(index) {
      // Parse data for showing place here
      this.placeInfo = true;
    },

    geolocate: function() {
      this.$refs.map.$mapPromise.then(() => {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          var geocoder = new this.google.maps.Geocoder();
          let self = this;
          const getCityName = this.getCityName
          geocoder.geocode({'latLng': this.center}, function(results, status) {
            if (status === 'OK') {
              self.city = getCityName(results[0].formatted_address)
              self.penguin = self.markers.filter(c=>c.visited==true && c.cityName==self.city).length
              self.city = self.city.split("-")[0]
              }
           });
        });
      });
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
