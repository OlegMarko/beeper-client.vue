// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

require('../node_modules/bootstrap/less/bootstrap.less')
require('./assets/beeper.css')
require('./assets/alertify/alertify.min.css')
require('./assets/alertify/alertify.min.js')

alertify.defaults.notifier.position = 'top-right'

Vue.config.productionTip = false

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
