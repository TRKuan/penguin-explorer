<template lang="html">
  <router-link :to="{name:'city', params:{city:cityName/*you may want to replace this with id*/}}" class="list-group-item flex-column flex-md-row" exact>
    <div class="name">
      {{cityName}}
    </div>
    <div class="star">
      <font-awesome-icon icon="star" class="star-icon"/>{{startNum}}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CityListItem',
  props: {
    cityName: String,
    startNum: Number
  }
}
</script>

<style lang="css" scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
}
div.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.star {
  width: 4rem;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
}
.star-icon {
  color: yellow;
}
</style>
