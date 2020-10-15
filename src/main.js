
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
// 引入公共组件
import './components'
// 引入vuex
import store from '../src/store/index'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  store
})
