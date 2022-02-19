import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from "./store";

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from './utils/menus';
import "font-awesome/css/font-awesome.css"

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.use(ElementUI);


Vue.config.productionTip = false


router.beforeEach((to, from, next)=>{
  /**
   * 已经登录,
   */
  if (window.sessionStorage.getItem("tokenStr")){
      initMenu(router,store);
      if(!window.sessionStorage.getItem("user")){
          getRequest('/admin/info').then(resp=>{
              window.sessionStorage.setItem('user',JSON.stringify(resp));
              console.log('fgas')
              //这个next没有调用，也没有打印信息
              next();
          })
      }else{
        next();
      }
  }else{
      if (to.path=='/'){
        next();
      }else{
        next("/?redirect="+to.path);
      }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
