<template lang="html">
  <div class="places">
    <h1 class="title">Places</h1>
    <router-link :to="{name:'city', params:{city:'cityName'/*you may want to replace this with id*/}}" class="city"><h2>City</h2></router-link>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">123
    </div>
    <div class="place-list list-group">
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="false"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="false"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="true"/>
    </div>
    <br />
    <router-link :to="{name:'city', params:{city:'cityName'/*you may want to replace this with id*/}}" class="city"><h2>City</h2></router-link>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">12
    </div>
    <div class="place-list list-group">
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="false"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="true"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="true"/>
    </div>
    <br />
    <router-link :to="{name:'city', params:{city:'cityName'/*you may want to replace this with id*/}}" class="city"><h2>City</h2></router-link>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">4
    </div>
    <div class="place-list list-group">
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="false"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="true"/>
      <place-list-item placeName="Place1" visiteDate="9-11-2018" :visited="true"/>
    </div>
  </div>
</template>

<script>
import PlaceListItem from '@/components/PlaceListItem.vue'
export default {
  name: 'Places',
  components: {
    PlaceListItem
  }
}
</script>

<style lang="css" scoped>
.places {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-bottom: 2rem;
}
.title {
  margin-bottom: 2rem;
}
.city {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.city h2{
  margin-bottom: 0;
}
.list-group {
  width: 100%;
  max-width: 600px;
}
a {
  color: black;
}
div.penguin {
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.penguin-icon {
  height: 2rem;
  width: 2rem;
  margin-right: 0.3rem;
}
</style>
