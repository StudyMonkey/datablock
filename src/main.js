import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import { DatePicker,Select,TreeSelect,Checkbox,Radio,Input,Button,Pagination } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

Vue.use(DatePicker);
Vue.use(Select);
Vue.use(TreeSelect);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Button);
Vue.use(Pagination);

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
