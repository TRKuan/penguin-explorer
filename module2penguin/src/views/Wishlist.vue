<template lang="html">
  <div class="wishlist">
    <h1 class="title">Wishlist</h1>
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
export default {
  name: 'Wishlist'
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
}
a {
  color: black;
}
</style>
