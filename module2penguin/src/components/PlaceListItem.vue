<template lang="html">
  <router-link :to="{name:'place', params:{id:placeName/*you may want to replace this with id*/}}" class="list-group-item flex-column flex-md-row" exact>
    <div class="name">
      {{placeName}}
    </div>
    <div class="date">
      <font-awesome-icon icon="calendar" class="calendar-icon"/>{{date}}
    </div>
  </router-link>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PlaceListItem',
  props: {
    placeName: String,
    visiteDate: String
  },
  computed: {
    date: function(){
      return moment(this.visiteDate).format('MM-DD-YYYY')
    }
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
div.date {
  width: 7rem;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
}
.calendar-icon {
  margin-right: 2px;
}
</style>
