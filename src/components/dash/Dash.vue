<template>
  <div id="dashWrap">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-md-offset-1 col-sm-5">
          <sidebar></sidebar>
        </div>
        <div class="col-md-7 col-sm-7 mainView">
          <transition>
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Sidebar from './SideBar.vue'

    export default {
        name: 'dash',
        components: {
            sidebar: Sidebar
        },
        created: function () {
            if (this.$auth.loggedIn()) {
                this.$http.get('/users/me')
                    .then((response) => {
                        this.$store.commit('setCurrentUser', response.body)
                    })
                    .catch((response) => {
                        this.$store.commit('clearCurrentUser')
                    })
            } else {
                this.$store.commit('clearCurrentUser')
            }
        }
    }
</script>

<style scoped>
  #dashWrap {
    min-height: 100%;
    padding-top: 50px;
    background: #42275a;
    background: -webkit-linear-gradient(to left, #42275a, #734b6d);
    background: linear-gradient(to left, #42275a, #734b6d)
  }

  .mainView {
    background: #fff;
    border-radius: 6px;
    padding: 20px;
  }
</style>

