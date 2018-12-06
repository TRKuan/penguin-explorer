<template>
  <div>
    <div>
      <div>
        <div>
          <div class="subcontainer">
            <div class="penguin">
              {{ city }}:
              <img class="penguin-icon" src="../assets/penguin.png" alt="penguin"> {{ penguin }}
            </div>
            <div class="search">
              <gmap-autocomplete
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
              v-if="!m.visited"
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
              v-if="m.visited"
              :position="m.marker"
              :clickable="true"
              :icon="{ 
                url: require('../assets/penguin.png'), 
                size: {width: 46, height: 46, f: 'px', b: 'px'}, 
                scaledSize: {width: 45, height: 45, f: 'px', b: 'px'}
              }"
              @click="showPlace(index)">
            </gmap-marker>
        </div>
      </gmap-map>
    </div>
    <place-list-item v-if="placeInfo" placeName="Place" visiteDate="9-11-2018" :visited="placeInfo"/>
  </div>
</template>

<script>

import { auth, users} from "@/firebaseConfig.js"
import {gmapApi} from 'vue2-google-maps'
import PlaceListItem from './PlaceListItem.vue'

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
    PlaceListItem
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
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.penguin++;
        this.addPlace(this.currentPlace, true, false)        
        this.currentPlace = null;
      }
    },
    getCityName(address){
      let addressArray = address.split(", ")
      let l = addressArray.length
      return addressArray[l-3].replace(/ /g, '-')+"-"
            +addressArray[l-2].replace(/ /g, '-')+"-"
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
        users.doc(auth.currentUser.uid).collection("places").add({name, address,cityName,marker,visited,wishlisted})
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
          geocoder.geocode({'latLng': this.center}, function(results, status) {
            if (status === 'OK') {
              self.city = this.getCityName(results[0].formatted_address)
                // get number of penguins
                for (var i = 0; i < self.markers.length; i++) {
                  if (self.markers[i].cityName == self.city && self.markers[i].visited == true) {
                    self.penguin++;
                  }
                }
              }
           });
        
          let currCityPlaces = users.doc(auth.currentUser.uid)
                              .collection("places")
                              .where("cityName","==", self.cityName);
          self.penguin = currCityPlaces.filter(c=>c.visited==true).length
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
