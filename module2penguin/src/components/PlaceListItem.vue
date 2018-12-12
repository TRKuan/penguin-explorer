<template lang="html">
  <div v-if="visited|wishlisted">
    <router-link :to="{name:'place', params:{id:placeId}}" class="list-group-item flex-column flex-md-row" exact>
      <div class="name">
        {{placeName}}
          <div v-if="visited"  class="penguin">
            {{date}}
            <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
          </div>
          <div v-else-if="wishlisted" class="penguin">
            <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" alt="penguin">
          </div>

      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PlaceListItem',
  props: {
    placeName: String,
    visiteDate: String,
    visited: Boolean,
    wishlisted: Boolean,
    place: Object,
    placeId: String,

  },
  computed: {
    date: function(){
      return moment(this.visiteDate).format('MM-DD-YYYY')
    },
    url(){
      return this.placeName.replace(/ /g,"_")+"_"+this.place.marker.lat+"_"+this.place.marker.lng
    }
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
  white-space:normal;
  width: 100%;
}
div.date {
  float: right;
  width: 7rem;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  color: gray;
  text-align: right;
}
.badge {
  margin-left: 0.5rem;
}
div.penguin {
  width: fit content;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  color: darkgrey;
  font-size: .8em;
}
.penguin-icon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.3rem;
}
</style>
