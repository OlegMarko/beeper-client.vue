<template>
  <div id="profile">
    <div>
      <p class="text-center">
        <img :src="user.avatar" alt="avatar" class="img-circle">
      </p>
      <h2 class="text-center">@{{ user.username }}</h2>
      <hr>
      <p class="text-center m-b-20">{{ user.about }}</p>
      <hr>
      <beep-list :endpoint="'/users/' + $route.params.username + '/beeps'" :showUserInfo="false"></beep-list>
    </div>
  </div>
</template>

<script>
  import BeepList from '@/components/dash/BeepList.vue';

  export default {
    name: 'profile',
    components: {
      beepList: BeepList
    },
    created: function () {
      this.getUser()
    },
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      getUser: function () {
        this.$http.get('/users/' + this.$route.params.username)
            .then((response) => {
              this.user = response.body
            })
      }
    }
  }
</script>

<style scoped>
  #profile img {
    max-width: 200px;
  }
</style>
