<template lang="html">
  <div class="city">
    <city-info />
    <br />
    <div class="place-list list-group">
      <place-list-item placeName="Place1" visiteDate="9-11-2018"/>
      <place-list-item placeName="Place2" visiteDate="2-21-2018"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
      <place-list-item placeName="Place3" visiteDate="12-27-2017"/>
    </div>
  </div>
</template>

<script>
import CityInfo from '@/components/CityInfo.vue'
import PlaceListItem from '@/components/PlaceListItem.vue'
export default {
  name: 'City',
  components: {
    PlaceListItem,
    CityInfo
  }
}
</script>

<style lang="css" scoped>
</style>
