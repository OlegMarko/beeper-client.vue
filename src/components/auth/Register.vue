<template>
	<div>
		<h3 class="text-center">Register</h3>

		<input type="email" class="form-control m-b-15" placeholder="Email address">
		<input type="text" class="form-control m-b-15" placeholder="Username">
		<input type="password" class="form-control m-b-15" placeholder="Password">

		<hr>

		<button class="btn btn-lg btn-primary btn-block m-b-15">Register</button>

		<p class="text-center">
			Already have an account? 
			<router-link to="/auth/login">Sign In</router-link>
		</p>
	</div>
</template>

<script>
	export default {
		name: "register"
	}
</script>

<style>
</style>
