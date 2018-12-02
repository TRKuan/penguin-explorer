<template lang="html">
  <div class="proflie">
    <user-info />
    <div class="city-list list-group">
      <city-list-item cityName="Minneapolis" :startNum="114"/>
      <city-list-item cityName="St. Paul" :startNum="23"/>
      <city-list-item cityName="New York" :startNum="5"/>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import CityListItem from '@/components/CityListItem.vue'
export default {
  name: 'Profile',
  components: {
    UserInfo,
    CityListItem
  }
}
</script>

<style lang="css" scoped>
.proflie {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.city-list {
  width: 100%;
  max-width: 600px;
}
</style>
