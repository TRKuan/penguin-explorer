<template>
  <div>
    <div>
      <!-- <h2>Search and add a pin</h2> -->
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>
    </div>
    <br>
    <div>
      <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 75vh; "
      >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="addInfoWindow(index)">
            <gmap-info-window
              :position="m.position"
              :opened="infoWindows[index].open"
              @closeclick="infoWindows[index].open=false">
              <p>{{ m.position }}</p>
          </gmap-info-window>
        </gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import {db, auth, users} from "@/firebaseConfig.js"
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      map: null,
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      infoWindows: []
    };
  },
  mounted() {
    this.geolocate();
    this.markers.map(marker => {
      this.$set(marker, 'open', true);
      return marker;
    });
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
        this.infoWindows.push({open : false});
        this.center = marker;
        console.log(this.currentPlace)
        db.collection('users').doc(auth.currentUser.uid).get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            db.collection('users').doc(auth.currentUser.uid).collection("places").add({place:this.currentPlace})
          } else {
            db.collection('users').doc(auth.currentUser.uid).set({userid:auth.currentUser.uid})
            db.collection('users').doc(auth.currentUser.uid).collection("places").add({place:this.currentPlace})
          }
        });
        
        this.currentPlace = null;
      }
    },

    addInfoWindow(index) {
      this.infoWindows[index].open = true;
    },

    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style>
.infowindow {
  visibility: hidden;
}
</style>

