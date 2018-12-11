<template lang="html">
  <div v-if="visited|wishlisted">
    <router-link :to="{name:'place', params:{id:placeId}}" class="list-group-item flex-column flex-md-row" exact>
      <div class="name">
        {{placeName}}
        <span v-if="visited" class="badge badge-success">Visited</span>
        <span v-else-if="wishlisted" class="badge badge-dark">Wishlist</span>
      </div>
      <div v-if="visited" class="date">
        {{date}}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div.date {
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
</style>
