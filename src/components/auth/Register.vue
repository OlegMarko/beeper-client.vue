<template>
	<div>
		<h3 class="text-center">Register</h3>

		<input v-model="user.email" type="email" class="form-control m-b-15" placeholder="Email address">
		<input v-model="user.username" type="text" class="form-control m-b-15" placeholder="Username">
		<input v-model="user.password" type="password" class="form-control m-b-15" placeholder="Password">

		<hr>

		<button @click="register" class="btn btn-lg btn-primary btn-block m-b-15">Register</button>

		<p class="text-center">
			Already have an account? 
			<router-link to="/auth/login">Sign In</router-link>
		</p>
	</div>
</template>

<script>
	export default {
		name: "register",
		data: function() {
			return {
				user: {
					email: '',
					username: '',
					password: ''
				}
			}
		},
		methods: {
			register: function() {
				this.$http.post(process.env.API_URL + '/users', this.user)
					.then(function (response) {
						alertify.success(
							"Success! You can now login with your email and password."
						)
						this.$router.push('/auth/login')
					})
					.catch(function (response) {
						if (response.status == 422) {
							response.body.errors.forEach((e) => {
								alertify.error(e)
							})
						}
					})
			}
		}
	}
</script>

<style>
</style>
