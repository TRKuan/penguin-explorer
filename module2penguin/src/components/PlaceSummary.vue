<template>
  <div>
  <div v-if="placeDoc" id = "placeSummary">
  <router-link  :to="{name:'place', params:{id:placeDoc.id}}" >
    <h4 id = "placename">{{placeDoc.name}}</h4>
  </router-link>
  <button v-if="placeDoc.visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Edit Check-in
  </button>
  <button v-if="!placeDoc.visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Check In
  </button>
  <div id = "visitDate" v-if = "placeDoc.visited">
    <p>{{placeDoc.visitedDate}}</p>
    <img class="icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
  </div>
  <div id = "wishlist-checkin" v-if = "!placeDoc.visited">
    <img @click="toggleWishlist(false)" v-if = "placeDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="heart">
    <img @click="toggleWishlist(true)" v-else-if = "!placeDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" alt="heart">
  </div><br>
  <p id = "address">{{placeDoc.address}}</p><br>
  <div v-if ="placeDoc.visited && this.$route.path !== '/map'" id = "usersNotesPhoto" >
    <img v-if="placeDoc.imgURL" class = "place-photo" v-bind:src="placeDoc.imgURL" alt="place photo">
    <div><p>{{placeDoc.notes}}</p></div>
  </div>
  <!-- v-for looped collection of other users notes and photos of the place -->
  </div>
  <!--Add place form-->
  <div class="modal fade" id="form">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <AddPlaceForm v-if="placeDoc" :placeDoc="placeDoc" :edit="placeDoc.visited" :visitDate="placeDoc.visitedDate" />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AddPlaceForm from '@/components/AddPlaceForm.vue'
import {auth, users} from "@/firebaseConfig.js"

export default {
  name: "PlaceSummary",
  components: {
    AddPlaceForm
  },
  props:{
    placeDoc: Object
  },
  data() {
    return {
      UsersNotesPhoto: {
        imgURL: null,
        notes: ""
      },
    };
  },
  methods: {
    toggleWishlist (val) {
       this.$emit('toggleWishlist', val)
    }
  },
};
</script>
<style>
#visitDate, wishlist-checkin{
color: darkgrey;
float: right;
}
#placename {
float: left;
margin-bottom: 0px !important;
}
.icon {
  height: 2rem;
  width: 2rem;
  float: right;
  margin: .25em;
}

#address{
padding:0px;
width: 100%;
}

.visited-button {
position: fixed;
bottom: .5em;
right: .5em;
}

place-photo {
width: 100%;
display: block;
margin: auto;
}

@media (min-width: 576px) {
  #form .modal-dialog {
    max-width: 500px;
  }
}
@media (min-width: 768px) {
  #form .modal-dialog {
    max-width: 700px;
  }
}
@media (min-width: 992px) {
  #form .modal-dialog {
    max-width: 800px;
  }
}
</style>
