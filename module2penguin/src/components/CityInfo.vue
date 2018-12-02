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
  name: 'CityInfo'
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
  height: 350px;
  background-image: url(https://www.roadtrips.com/wp-content/uploads/2017/12/minneapolis.jpg);
  background-repeat: no-repeat;
  background-position: top;
  background-attachment: fixed;
  background-clip: border-box;
  background-size: 100% auto;
}
@media (max-width: 767px/*sm*/) {
  .city-img {
    background-size: 200% auto;
    height: 150px;
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
