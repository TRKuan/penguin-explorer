<template lang="html">
  <router-link :to="{name:'city', params:{city:cityName/*you may want to replace this with id*/}}" class="list-group-item" exact>
    <div class="name">
      {{cityName.replace("-",", ")}}
    </div>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">{{penguinNum}}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CityListItem',
  props: {
    cityName: String,
    penguinNum: Number
  }
}
</script>

<style lang="css" scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
}
a {
  color: black;
}
div.name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.penguin {
  width: 4rem;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
}
.penguin-icon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.3rem;
}
</style>
