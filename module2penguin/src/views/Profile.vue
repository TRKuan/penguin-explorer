<template lang="html">
  <div class="proflie">
    <auth class="auth d-md-none"/>
    <user-info :photo="profileInfo.photo" :name="profileInfo.name"/>
    <div class="city-list list-group">
      <h1 class="title">Cities</h1>
      <template v-for="(city, idx) in cities">
      <city-list-item :key="idx" :cityName="city.cityName"/>
      </template>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import CityListItem from '@/components/CityListItem.vue'
import Auth from "@/components/Auth.vue"
import {auth, users} from "@/firebaseConfig.js"
export default {
  name: 'Profile',
  components: {
    UserInfo,
    CityListItem,
    Auth
  },
  data() {
    return {
      profileInfo: [],
      cities: []
    };
  },
  firestore() {
    return {
      profileInfo: users.doc(auth.currentUser.uid),
      cities: users.doc(auth.currentUser.uid).collection("cities")
    };
  },
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
@media (max-width: 767px/*sm*/) {
  .proflie {
    margin-top: 0;
  }
}
.auth {
  margin-left: auto;
}
.city-list {
  width: 100%;
  max-width: 600px;
}
</style>
