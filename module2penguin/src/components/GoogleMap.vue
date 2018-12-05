<template>
  <div>
    <div>
      <div>
        <div>
          <div class="subcontainer">
            <div class="penguin">
              {{ city }}:
              <img class="penguin-icon" src="../assets/penguin.png" alt="penguin"> 123
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
      <gmap-map
      ref="map"
      :position="google"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 75vh;"
      >
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :icon="{ 
              url: require('../assets/penguin.png'), 
              size: {width: 46, height: 46, f: 'px', b: 'px'}, 
              scaledSize: {width: 40, height: 40, f: 'px', b: 'px'}
            }"
            @click="showPlace()">
        </gmap-marker>
      </gmap-map>
    </div>
    <place-list-item v-if="placeInfo" placeName="Place" visiteDate="9-11-2018" :visited="true"/>
  </div>
</template>

<script>
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
      penguin: 114, 
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
        this.currentPlace = null;
      }
    },

    showPlace() {
      this.placeInfo = !this.placeInfo;
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
              for (var i = 0; i < results[0].address_components.length; i++) {
              var address = results[0].address_components[i];
                if (address.types[0] == "locality" || address.types[0] == "political") {
                    self.city = address.long_name
                }
              }
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
