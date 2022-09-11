import Vue from 'vue'
import App from './App.vue'

import '@/componentsLibrary/bootrapVueUI'
import '@/componentsLibrary/elementUi'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

new Vue({
    render: (h) => h(App),
}).$mount('#app')
