import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import { DatePicker,Select,TreeSelect,Checkbox,Radio,Input,Button,Pagination,Modal,Tooltip,message,Tag } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import '../http-interceptor'
import 'babel-polyfill'

/*Vue.component(Button.name, Button);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(TreeSelect.name, TreeSelect);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Radio.name, Radio );
Vue.component(Pagination.name, Pagination);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Modal.name, Modal);*/
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(TreeSelect);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Modal);
Vue.use(Tooltip);
Vue.use(Tag);


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
// Vue.prototype.token = 'eyJlaWQiOiAiMzcwMTAzMTk4ODEyMTI0NTE0IiwgImNyZWF0ZV90aW1lIjogIjIwMTktMDMtMDUgMTU6Mjk6MTUiLCAidXNlcl9hZ2VudCI6ICJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82OC4wLjM0NDAuMTA2IFNhZmFyaS81MzcuMzYifQ==';
// 谷歌测试token
// Vue.prototype.token = 'eyJlaWQiOiAia3N6IiwgImNyZWF0ZV90aW1lIjogIjIwMTktMDItMjcgMTY6MDE6MjciLCAidXNlcl9hZ2VudCI6ICJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS82OC4wLjM0NDAuMTA2IFNhZmFyaS81MzcuMzYifQ==';
// 火狐测试token
// Vue.prototype.token = 'eyJlaWQiOiAia3N6IiwgImNyZWF0ZV90aW1lIjogIjIwMTktMDMtMDcgMTQ6Mjc6MzgiLCAidXNlcl9hZ2VudCI6ICJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCA2LjE7IFdpbjY0OyB4NjQ7IHJ2OjYxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvNjEuMCJ9';
// Vue.prototype.template_id = '5b9b0343d84efb159863fc5a'
Vue.prototype.httpUrl = 'http://10.128.18.98:9011/reportserver/v2'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
