<template lang="html">
  <div class="city-info">
      <div class="city-img"></div>
      <p class="city-name">Minneapolis</p>
      <div class="star">
        <font-awesome-icon icon="star" class="star-icon"/>114
      </div>
  </div>
</template>

<script>
export default {
  name: 'CityInfo',
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      cityInfo: null,
    };
  },
  firestore() {
    return {
      cityInfo: db.collection("users").doc(auth.currentUser.uid)
                  .collection("cities").where("cityName","==",this.$route.params.cityName),
      cityPlaces: db.collection("users").doc(auth.currentUser.uid)
                  .collection("cities").where("cityName","==",this.$route.params.cityName).collection("places")
    };
  },
}
</script>

<style lang="css" scoped>
.city-info {
  display: flex;
  width: 100%;
  flex-flow: column;
  align-items: center;
}
.city-img {
  width: 100%;
  height: 250px;
  background-image: url(https://ak5.picdn.net/shutterstock/videos/18964145/thumb/1.jpg);
  background-repeat: no-repeat;
  background-position: 0 -30%;
  background-attachment: fixed;
  background-clip: border-box;
  background-size: 100% auto;
}
@media (max-width: 767px/*sm*/) {
  .city-img {
    height: 150px;
      background-position: 0 0;
  }
}
.city-name {
  font-size: 2rem;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.star {
  white-space: nowrap;
  overflow: hidden;
}
.star-icon {
  color: yellow;
}
</style>
