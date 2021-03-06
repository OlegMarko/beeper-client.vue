// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Auth from './plugins/Auth.js'
import store from './starage/index'

require('../node_modules/bootstrap/less/bootstrap.less');
require('./assets/beeper.css');
require('./assets/alertify/alertify.min.css');
require('./assets/alertify/alertify.min.js');

Vue.use(VueResource);
Vue.use(Auth);

alertify.defaults.notifier.position = 'top-right';

Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {

    if (request.url[0] === '/') {
        request.url = process.env.API_URL + request.url;

        var token = Vue.auth.getToken();
        if (token) {
            request.headers.set('Authorization', 'Bearer ' + token)
        }
    }

    next((response) => {
        if (response.status == 422) {
            response.body.errors.forEach((e) => {
                alertify.error(e)
            })
        }
    })
});

router.beforeEach((to, from, next) => {
    //prevent access to 'requiresGuest' route
    if (to.matched.some((record) => { return record.meta.requiresGuest}) && Vue.auth.loggedIn()) {
        next({
            path: '/newsfeed'
        })
    } else if (to.matched.some((record) => { return record.meta.requiresAuth }) && !Vue.auth.loggedIn()) {
        next({
            path: '/auth/login',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: { App }
});
