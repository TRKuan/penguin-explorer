<template>
  <div>
  <div id = "placeSummary">
  <h3 id = "placename">{{PlaceName}}</h3>
  <div id = "visitDate" v-if = "Visited">
    <p >{{DateVisited}}</p>
    <img class="icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
  </div><br>
  <p id = "address">{{PlaceAddress}}</p><br>
  <div id = "wishlist-checkin" v-if = "!Visited">
    <img v-if = "OnWishlist" class="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="heart">
    <img v-else-if = "!OnWishlist" class="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" alt="heart">
    <img class="icon" src="https://image.flaticon.com/icons/svg/447/447031.svg" alt="heart">
  </div>
  <div v-if = "Visited" id = "usersNotesPhoto" class = "media">
    <img class="place-photo align-self-start mr-3" v-bind:src="UsersNotesPhoto.imgURL" alt="place photo">
    <div class = "media-body"><p>{{UsersNotesPhoto.notes}}</p></div>
  </div>
  <!-- v-for looped collection of other users notes and photos of the place -->
  </div>
  </div>
</template>

<script>
export default {
  name: "PlaceSummary",
  data() {
    return {
      PlaceName: "J&S Bean Factory",
      PlaceAddress: "1518 Randolph Ave, St Paul, MN 55105",
      City: "Minneapolis",
      Visited: true,
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
#placeSummary{
margin: 1em;
}
.icon {
  height: 2rem;
  width: 2rem;
  float: right;
  margin: .25em;
}
.place-photo {
width: 10em;
}

#address{
padding:0px;
width: 100%;
}
.place-notes {
width: 100%
}

</style>
