import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import VueResource from 'vue-resource'
import LoadScript from 'vue-plugin-load-script';
import vuejquery from 'vue-jquery'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(LoadScript);

Vue.use(vuejquery)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
