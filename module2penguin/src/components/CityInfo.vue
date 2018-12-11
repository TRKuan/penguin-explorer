<template lang="html">
  <div class="city-info">
      <p class="city-name">{{name.replace(/-/g," ").replace(/_/g,", ")}}</p>
      <div class="penguin">
        <img class="penguin-icon" src="../assets/penguin.png" alt="penguin">{{starNum}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'CityInfo',
  props: {
    name: String,
    starNum: Number
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
div.penguin {
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
}
.penguin-icon {
  height: 2rem;
  width: 2rem;
  margin-right: 0.3rem;
}
</style>
