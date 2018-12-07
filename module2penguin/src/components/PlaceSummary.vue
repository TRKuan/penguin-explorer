<template>
  <div>
  <div id = "placeSummary">
  <h3 id = "placename">{{PlaceName}}</h3>
  <button v-if = "Visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Visited
  </button>
  <div id = "visitDate" v-if = "Visited">
    <p >{{DateVisited}}</p>
    <img class="icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
  </div>

  <div id = "wishlist-checkin" v-if = "!Visited">
    <img v-if = "OnWishlist" class="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="heart">
    <img v-else-if = "!OnWishlist" class="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" alt="heart">
    <img class="icon" src="https://image.flaticon.com/icons/svg/447/447031.svg" alt="checkin">
  </div><br>
  <p id = "address">{{PlaceAddress}}</p><br>
  <div v-if = "Visited" id = "usersNotesPhoto" >
    <img class = "place-photo" v-bind:src="UsersNotesPhoto.imgURL" alt="place photo">
    <div><p>{{UsersNotesPhoto.notes}}</p></div>
  </div>
  <!-- v-for looped collection of other users notes and photos of the place -->
  </div>
  <!--Add place form-->
  <div class="modal fade" id="form">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <AddPlaceForm />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AddPlaceForm from '@/components/AddPlaceForm.vue'
export default {
  name: "PlaceSummary",
  components: {
    AddPlaceForm
  },
  data() {
    return {
      PlaceName: "J&S Bean Factory",
      PlaceAddress: "1518 Randolph Ave, St Paul, MN 55105",
      City: "Minneapolis",
      Visited: false,
      OnWishlist: false,
      DateVisited: "Dec 5 2018",
      OtherUsersNotesPhotos: [],
      UsersNotesPhoto: {
        imgURL: "https://i.pinimg.com/originals/be/19/d1/be19d16586d664258625ef4aef738c43.jpg",
        notes: "Best coffee in the world!!  Great spot to sit and chill.  Easy to get work done here.  Good music, friendly people, nice neighborhood."
      },
    };
  },

  methods: {

  }
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
