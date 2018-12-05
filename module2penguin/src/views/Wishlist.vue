<template lang="html">
  <div class="wishlist">
    <h1 class="title">Wishlist</h1>
    <template v-for="(wish, idx) in wishList">
    <router-link v-bind:key="idx" :to="{name:wish.cityName}" class="city"><h2>{{wish.cityName}}</h2></router-link>
    <div v-bind:key="idx" class="place-list list-group">
    <template v-for="(wishplace, idx) in wishList.places">
    <router-link v-bind:key="idx" :to="{name:wishplace.name}" class="place list-group-item" exact>{{wishplace.name}}</router-link>
    </template>
    </div>
    </template>
    <router-link :to="{name:'city'}" class="city"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
    </div>
    <br />
    <router-link :to="{name:'city'}" class="city"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
    </div>
    <br />
    <router-link :to="{name:'city'}" class="city"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="place list-group-item" exact>Place</router-link>
    </div>
  </div>
</template>

<script>
import {auth, users} from "@/firebaseConfig.js"
export default {
  name: 'Wishlist',
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      wishList: []
    };
  },
  firestore() {
    return {
      wishList: users.doc(auth.currentUser.uid)
                  .collection("wishlist").orderBy("placesCount"),
    };
  },
}
</script>

<style lang="css" scoped>
.wishlist {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.title {
  margin-bottom: 2rem;
}
.city, .place {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-group {
  width: 100%;
  max-width: 600px;
}
a {
  color: black;
}
</style>
