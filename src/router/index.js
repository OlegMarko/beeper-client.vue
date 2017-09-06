import Vue from 'vue'
import Router from 'vue-router'

import Auth from '@/components/auth/Auth'
import LogIn from '@/components/auth/LogIn'
import Register from '@/components/auth/Register'
 
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/auth',
			component: Auth,
			redirect: '/auth/login',
			children: [
				{
					path: 'login',
					component: LogIn
				}, {
					path: 'register',
					component: Register
				}
			]
		}
	]
})
