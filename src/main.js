import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

import * as d3 from 'd3'
Vue.prototype.$d3 = d3 //ds全局挂载


//关闭Vue的生产提示

Vue.config.productionTip = false

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this
	},	
})


// new Vue({
//   render: h => h(App),
// }).$mount('#app')
