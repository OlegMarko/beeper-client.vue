import Vue from 'vue'
import Router from 'vue-router'

// Auth
import Auth from '@/components/auth/Auth'
import LogIn from '@/components/auth/LogIn'
import Register from '@/components/auth/Register'

// Dash
import Dash from '@/components/dash/Dash.vue'
import NewsFeed from '@/components/dash/NewsFead.vue'

// Profile
import Profile from '@/components/dash/Profile.vue'

Vue.use(Router)

export default new Router({
	routes: [
    {
      path: '/',
      component: Dash,
      redirect: '/newsfeed',
      children: [
        {
          path: 'newsfeed',
          component: NewsFeed,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'profile/:username',
          component: Profile
        }
      ]
    },
		{
			path: '/auth',
			component: Auth,
			redirect: '/auth/login',
			children: [
				{
					path: 'login',
          component: LogIn,
          meta: {
            requiresGuest: true
          }
				}, {
					path: 'register',
          component: Register,
          meta: {
            requiresGuest: true
          }
				}
			]
		}
	]
})
