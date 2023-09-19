import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueLazyload from "vue-lazyload";

Vue.use(Vant)
Vue.use(VueLazyload,{
  loading: require('@/assets/img/products/apple/1/1.jpg')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
