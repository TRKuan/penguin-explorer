<template lang="html">
  <router-link :to="{name:'city', params:{city:cityName}}" class="list-group-item" exact>
    <div class="name">
      {{name.replace(/-/g,' ').replace(/_/g,', ')}}
    </div>
    <div class="penguin">
      <img class="penguin-icon" src="https://image.flaticon.com/icons/svg/826/826963.svg" alt="penguin">
      {{penguins.length}}
    </div>
  </router-link>
</template>

<script>
import { auth, users} from "@/firebaseConfig.js"
export default {
  name: 'CityListItem',
  props: {
    cityName: String
  },
  data() {
    return {
      penguins: []
    };
  },
  firestore() {
    return {
      profileInfo: users.doc(auth.currentUser.uid),
      penguins: users.doc(auth.currentUser.uid).collection("places").where("visited", "==", true).where("cityName","==",this.cityName)
    };
  },
  computed:{
    name(){
      return this.cityName.replace(/-/g," ")
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
