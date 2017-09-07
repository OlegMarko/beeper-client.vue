<template>
	<div>
		<h3 class="text-center">LogIn</h3>

		<input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
		<input v-model="user.password" type="password" class="form-control m-b-15" placeholder="Password">

		<hr>

		<button @click="logIn" class="btn btn-lg btn-primary btn-block m-b-15">Sign In</button>

		<p class="text-center">
      Don't have an account?
      <router-link to="/auth/register">Sign Up!</router-link>
    </p>
	</div>
</template>

<script>
	export default {
		name: "login",
		data: function () {
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			logIn: function () {
				this.$http.post('/auth', this.user)
          .then((response) => {
            this.$auth.setToken(
              response.body.token,
              Date.now() + 14400000 // + 4 hours
            )

            alertify.success(
							"Success! You logged."
						)
            this.$router.push('/newsfeed')
          })
          .catch((response) => {
            // ERROR
          })
			}
		}
	}
</script>

<style>
</style>
