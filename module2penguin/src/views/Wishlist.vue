<template lang="html">
  <div class="wishlist">
    <router-link :to="{name:'city'}"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
    </div>
    <br />
    <router-link :to="{name:'city'}"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
    </div>
    <br />
    <router-link :to="{name:'city'}"><h2>City</h2></router-link>
    <div class="place-list list-group">
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
      <router-link :to="{name:'place'}" class="list-group-item" exact>Place</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wishlist'
}
</script>

<style lang="css" scoped>
h2 {
  margin-left: 0.5rem;
}
a {
  color: black;
}
</style>
