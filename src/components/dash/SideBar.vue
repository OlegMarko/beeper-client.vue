<template>
  <div id="sidebar" class="text-center m-b-15">
    <h4 class="text-center">@{{ user.username }}</h4>

    <hr>

    <div class="row">
      <div class="col-sm-6">
        <a href="#" class="btn btn-block btn-default m-b-15">
          <i class="fa fa-user"></i>
          Profile
        </a>
      </div>
      <div class="col-sm-6">
        <a href="#" class="btn btn-block btn-default m-b-15">
          <i class="fa fa-newspaper-o"></i>
          Feed
        </a>
      </div>
    </div>

    <div class="beepNowWrap m-t-20 m-b-20">
      <textarea v-model="newBeep" class="form-controll" rows="10" placeholder="Start writing your beep here!"></textarea>
      <p class="text-muted">{{ 320 - newBeep.length }} character{{ 320 - newBeep.length == 1 ? '' : 's' }} remaining</p>
      <p class="text-center no-margin">
        <button class="btn btn-primary">Beep Now!</button>
      </p>
    </div>

    <div class="rov">
      <div class="col-sm-6">
        <p class="text-center no-margin">
          <a href="#">
            <i class="fa fa-cog"></i> Settings
          </a>
        </p>
      </div>
      <div class="col-sm-6">
        <p class="text-center no-margin">
          <a href="#" @click.prevent="logout">
            <i class="fa fa-power-off"></i> Logout
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    created: function () {
      this.getUser()
    },
    data: function () {
      return {
        user: {},
        newBeep: ''
      }
    },
    methods: {
      logout: function () {
        this.$auth.destroyToken()
        this.user = {}
        this.$router.push('/auth/login')
      },
      getUser: function () {
        this.$http.get('/users/me')
            .then((response) => {
              this.user = response.body
            })
      }
    }
  }
</script>

<style>
  #sidebar {
    background: #fff;
    padding: 20px;
    border-radius: 6px;
  }

  .beepNowWrap {
    background: #f0f0f0;
    margin: 20px -20px;
    padding: 20px;
  }

  .beepNowWrap textarea {
    background: transparent;
    border: transparent;
    box-shadow: none;
    resize: vertical;
    width: 100%;
  }
</style>
