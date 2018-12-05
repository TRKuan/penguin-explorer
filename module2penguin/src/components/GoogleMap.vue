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
import { auth, users} from "@/firebaseConfig.js"
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
        const name = this.currentPlace.name
        const address = this.currentPlace.formatted_address
        const visited = true;
        const wishlist = false;
        let addressArray = address.replace(/,/g, '').split(" ")
        let l = addressArray.length
        let tempName;
        if(isNaN(addressArray[l-2])){
          tempName = addressArray[l-3]+"-"+addressArray[l-2]+"-"+addressArray[l-1]
        }
        else{tempName = addressArray[l-4]+"-"+addressArray[l-3]+"-"+addressArray[l-1]}
        const cityName = tempName
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.infoWindows.push({open : false});
        this.center = marker;
        console.log(this.currentPlace.formatted_address)
        users.doc(auth.currentUser.uid).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              users.doc(auth.currentUser.uid)
                .collection("places").add({name, address,cityName,marker, visited, wishlist})
            } else {
              users.doc(auth.currentUser.uid).set({
                userid:auth.currentUser.uid,
                photo: auth.currentUser.photoURL,
                name: auth.currentUser.displayName
                })
                users.doc(auth.currentUser.uid)
                .collection("places").add({name, address,cityName,marker, visited, wishlist})
            } 
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

