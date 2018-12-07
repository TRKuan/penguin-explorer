<template>
  <div>
  <div id = "placeSummary">
  <h4 id = "placename">{{this.PlaceDoc.name}}</h4>
  <button v-if = "this.PlaceDoc.visited" class="visited-button btn btn-success" type="button" data-toggle="modal" data-target="#form">
    Add a Photo
  </button>
  <div id = "visitDate" v-if = "this.PlaceDoc.visited">
    <p>{{this.PlaceDoc.visitedDate}}</p>
    <img class="icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
  </div>

  <div id = "wishlist-checkin" v-if = "!this.PlaceDoc.visited">
    <img v-if = "this.PlaceDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="heart">
    <img v-else-if = "!this.PlaceDoc.wishlisted" class="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" alt="heart">
    <img class="icon" src="https://image.flaticon.com/icons/svg/447/447031.svg" alt="checkin">
  </div><br>
  <p id = "address">{{this.PlaceDoc.address}}</p><br>
  <div v-if = "this.PlaceDoc.visited" id = "usersNotesPhoto" >
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
import {auth, users} from "@/firebaseConfig.js"

export default {
  name: "PlaceSummary",
  components: {
    AddPlaceForm
  },
  data() {
    return {
      DocID: this.$route.params.id,
      PlaceDoc: {},
      UsersNotesPhoto: {
        imgURL: "https://i.pinimg.com/originals/be/19/d1/be19d16586d664258625ef4aef738c43.jpg",
        notes: "Your description and opinions of the place"
      },
    };
  },

  firestore() {
    var doctemp = users.doc(auth.currentUser.uid).collection("places").doc(this.DocID);
    console.log(doctemp);
    return {
      PlaceDoc: users.doc(auth.currentUser.uid).collection("places").doc(this.DocID),
    }

  },
  methods: {

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
