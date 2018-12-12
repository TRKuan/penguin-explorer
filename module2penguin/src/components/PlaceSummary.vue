<template>
  <div>
  <div>
  <div v-if="placeDoc" class = "card" id = "placeSummary">
  <span>
  <router-link  id = "placename" :to="{name:'place', params:{id:placeDoc.id}}" >
    <h4 >{{placeDoc.name}}</h4>
  </router-link>
  <div id = "visitDate" v-if = "placeDoc.visited">
    <p>{{placeDoc.visitedDate}}</p>
    <img class="icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
  </div>
  <div id = "wishlist-toggle" v-if = "!placeDoc.visited">
    <img @click="toggleWishlist(false)" v-if = "placeDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="heart">
    <img @click="toggleWishlist(true)" v-else-if = "!placeDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" alt="heart">
  </div>
  </span>
  <p id = "address">{{placeDoc.address}}</p>
  <span>
    <span v-if = "placeDoc.website!='none'" class = "infobit"><a v-bind:href="placeDoc.website">Visit their website</a></span>
    <span v-if = "placeDoc.price!='none'" class = "infobit"> <span v-for= "n in placeDoc.price">$</span></span>
    <span v-if = "placeDoc.rating!='none'" class = "infobit" >Rating: {{placeDoc.rating}}</span>
  </span>
  <router-link v-if ="this.$route.path == '/map'" id = "seemore" :to="{name:'place', params:{id:placeDoc.id}}" >
    <p>See more</p>
  </router-link>
  </div>
  <div class = "card" v-if ="placeDoc.visited && this.$route.path !== '/map'" id = "usersNotesPhoto" >
    <img v-if="placeDoc.imgURL" id = "user-photo" v-bind:src="placeDoc.imgURL" alt="place photo">
    <p class = "notes" >{{placeDoc.notes}}</p>
  </div>
  <div v-if ="this.$route.path !== '/map'" id = "photos" >
    <img :key="idx" v-for="(photo, idx) in placeDoc.photoURLs" class = "place-photo" v-bind:src="photo" alt="place photo">
  </div>
  </div>
  <div class="modal fade" id="form">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <AddPlaceForm v-if="placeDoc" :placeDoc="placeDoc" :edit="placeDoc.visited" :visitDate="placeDoc.visitedDate" />
      </div>
    </div>
  </div>
  <button v-if="placeDoc.visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Edit Check-in
  </button>
  <button v-if="!placeDoc.visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Check In
  </button>
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
        notes: "",
      },
    };
  },

  methods: {
    toggleWishlist (val) {
       this.$emit('toggleWishlist', val)
    },

  },

};
</script>
<style>
#visitDate, wishlist-toggle{
color: darkgrey;
float: right;
font-size: .7em;
}
#placename {
float: left;
margin-bottom: 0px !important;
}
.icon {
  height: 1.7rem;
  width: 1.7rem;
  float: right;
  margin: .25em;
}

#address{
padding:0px;
width: 100%;
margin: 0px
}

.visited-button {
position: fixed;
bottom: .6em;
right: .6em;
}

#user-photo {
  padding: .2em;
}

.place-photo {
width: 96%;
display: block;
margin: auto;
margin-bottom: .6em
}

@media (min-width: 576px) {
  #form .modal-dialog {
    max-width: 500px;
  }
}

#visitDate p {
  margin-bottom: 0px;
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

.card {
  margin: .4em;
  padding: .2em;
}

#seemore {

  margin-bottom: 0px;
}

.notes {
  margin: 0px;
}

.infobit {
  background-color: #ebedef;
  padding: .1em;
  margin: .2em;
}
</style>
