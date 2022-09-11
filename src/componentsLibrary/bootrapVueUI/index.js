import Vue from 'vue'
import { BModal, VBModal, BButton, VButton } from 'bootstrap-vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.component('BModal', BModal)
Vue.component('BButton', BButton)
Vue.directive('b-button', VButton)
Vue.directive('b-modal', VBModal)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)