<template>
  <div>
  <gmap-map
    ref="map"
    :position="google"
    :center="center"
    :zoom="12"
    :style="width + height">
    <div :key="index" v-for="(m, index) in filteredMarkers">
      <gmap-marker
        v-if="m.visited"
        :position="m.marker"
        :clickable="true"
        :icon="{
            url: require('../assets/penguin.png'),
            size: {width: 46, height: 46, f: 'px', b: 'px'},
            scaledSize: {width: 40, height: 40, f: 'px', b: 'px'}
          }"
          @click="$emit('showPlace', markers.indexOf(m))">
      </gmap-marker>
      <gmap-marker
        v-else-if="m.wishlisted"
        :position="m.marker"
        :clickable="true"
        :icon="{
            url: require('../assets/heart.png'),
            size: {width: 46, height: 46, f: 'px', b: 'px'},
            scaledSize: {width: 45, height: 45, f: 'px', b: 'px'}
          }"
        @click="$emit('showPlace', markers.indexOf(m))">
      </gmap-marker>
      <gmap-marker
        v-else
        :position="m.marker"
        :clickable="true"
        @click="$emit('showPlace', markers.indexOf(m))">
      </gmap-marker>
    </div>
  </gmap-map>
  </div>
</template>

<script>
/* eslint-disable */
import { auth, users } from "@/firebaseConfig.js";
import { gmapApi } from "vue2-google-maps";
import PlaceSummary from "./PlaceSummary.vue";
import moment from "moment";
import JQuery from "jquery";
import { exists } from 'fs';
let $ = JQuery;
export default {
  name: "GoogleMap",
  props: {
    page: String,
    width: String,
    height: String
  },
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
      placeInfo: false
    };
  },

  components: {
    PlaceSummary
  },

  computed: {
    google: gmapApi,
    filteredMarkers(){
      return this.markers.filter(c=>c.cityName==this.city)
    }
  },

  mounted() {
    this.geolocate(this.page);
    users
      .doc(auth.currentUser.uid).get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          users.doc(auth.currentUser.uid).set({
            userid: auth.currentUser.uid,
            photo: auth.currentUser.photoURL,
            name: auth.currentUser.displayName
          });
        }
      });
  },

  firestore() {
    if (auth.currentUser) {
      return {
        markers: users.doc(auth.currentUser.uid).collection("places"),
        cities: users.doc(auth.currentUser.uid).collection("cities")
      };
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker(currentPlace) {
      //console.log(currentPlace.address_components)
      let exists = this.markers.filter(c=>c.name==currentPlace.name)[0]
      if(exists){
        this.center = exists.marker
        this.$emit("showPlace",this.markers.indexOf(exists))
      }
      else if (currentPlace) {
        const marker = {
          lat: currentPlace.geometry.location.lat(),
          lng: currentPlace.geometry.location.lng()
        };
        // this.markers.push({ position: marker });
        this.places.push(currentPlace);
        this.center = marker;

        var query = users
          .doc(auth.currentUser.uid)
          .collection("places")
          .where("visited", "==", false)
          .where("wishlisted", "==", false);
        let self = this;
        query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete()
          });
          self.addPlace(currentPlace, false, false);
        });
      }
    },

    getCityName(components) {
      let city, state, country = "";
      city = components.filter(c=>c.types[0]=="locality")[0]
      if(!city) city = components.filter(c=>c.types[0]=="administrative_area_level_2")[0]
      state = components.filter(c=>c.types[0]=="administrative_area_level_1")[0]
      country = components.filter(c=>c.types[0]=="country")[0]

      return city.long_name.replace(/ /g, "-") + "_"
          + state.short_name.replace(/ /g, "-") + "_"
          + country.short_name.replace(/ /g, "-")
    },

    addPlace(currentPlace, visit, wishlist) {
      const name = currentPlace.name;
      const address = currentPlace.formatted_address;
      const visited = visit;
      const wishlisted = wishlist;
      const cityName = this.getCityName(currentPlace.address_components);
      const googId = currentPlace.id;
      var photoURLs = [];
      for (var i = 0; i < currentPlace.photos.length; i++) {
        photoURLs.push(currentPlace.photos[i].getUrl());
        console.log(currentPlace.photos[i]);
        console.log(currentPlace.photos[i].getUrl());
      }
      console.log(currentPlace.photos);
      console.log(photoURLs);
      const marker = {
        lat: currentPlace.geometry.location.lat(),
        lng: currentPlace.geometry.location.lng()
      };

      if (this.cities.filter(c => c.cityName == cityName).length == 0)
        users.doc(auth.currentUser.uid).collection("cities").doc(cityName).set({ cityName, places:1});
      else{ let places = users.doc(auth.currentUser.uid).collection("cities").doc(cityName).places
          users.doc(auth.currentUser.uid).collection("cities").doc(cityName).update({ places: places+1});
      }

      users.doc(auth.currentUser.uid).collection("places").add({
          name,address,cityName,marker,visited,wishlisted,
          visitedDate: moment().format("MM-DD-YYYY"), googId, photoURLs
        });
        let exists = null
        let self = this
        setTimeout(function(){
          exists = self.markers.filter(c=>c.name==currentPlace.name)[0]
          self.$emit("showPlace",self.markers.indexOf(exists))
          console.log(exists)
        }, 500);
    },

    showPlace(index) {
      // Parse data for showing place here
      this.showSummary = true;
      this.PlaceDoc = this.markers[index];
      this.PlaceIndex = index;
    },

    geolocate: function(page) {
      this.$refs.map.$mapPromise.then(() => {
      var geocoder = new this.google.maps.Geocoder();
      let self = this;

      if (page == "home") {
          var map = this.$refs.map.$mapObject
          this.google.maps.event.addListener(map,'idle', function() {
          this.center = map.getCenter();
          geocoder.geocode({ latLng: this.center }, function(results,status) {
              if (status === "OK") {
                self.city = self.getCityName(results[0].address_components);
                self.penguin = self.markers.filter(c => c.visited == true && c.cityName == self.city).length;
              }
            });
          });
          navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            geocoder.geocode({ latLng: this.center }, function(results,status) {
              if (status === "OK") {
                self.city = self.getCityName(results[0].address_components);
                self.penguin = self.markers.filter(c => c.visited == true && c.cityName == self.city).length;
              }
            });
          });
        } else {
          let address = page.replace(/_/g, ", ").replace(/-/g," ");
          this.city = page;
          geocoder.geocode({ address: address }, function(results, status) {
            if (status === "OK") {
              self.center = results[0].geometry.location;
              self.penguin = self.markers.filter(c => c.visited == true && c.cityName == self.city).length;
            }
          });
        }

      });
    }
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

#placeSummaryDiv {
  position: fixed;
  bottom: 0em;
  width: 100%;
  height: 8.15em;
  z-index: 100000;
  overflow-y: scroll;
}

</style>
