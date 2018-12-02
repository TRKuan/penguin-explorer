<template lang="html">
  <div class="user-info">
      <img class="profile-img" src="https://image.flaticon.com/icons/svg/1338/1338023.svg" alt="profile image">
        <p class="user-name">Username</p>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style lang="css" scoped>
.user-info {
  display: flex;
  flex-flow: column;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.profile-img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.user-name {
  font-size: 2rem;
}
</style>
