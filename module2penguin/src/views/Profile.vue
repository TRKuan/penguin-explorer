<template lang="html">
  <div class="proflie">
    <auth class="auth d-md-none"/>
    <user-info :photo="profileInfo.photo" :name="profileInfo.name"/>
    <div class="city-list list-group">
      <city-list-item cityName="Minneapolis" :penguinNum="114"/>
      <city-list-item cityName="St. Paul" :penguinNum="23"/>
      <city-list-item cityName="New York" :penguinNum="5"/>
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
      profileInfo: []
    };
  },
  firestore() {
    return {
      profileInfo: users.doc(auth.currentUser.uid),
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
  padding-bottom: 2rem;
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
