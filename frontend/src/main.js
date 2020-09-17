// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import Counter from './components/Counter'
import Header from './components/Header'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App, Counter, Header },
  template: `
            <div class="app">
            <Header></Header>
            <Counter></Counter>
            </br>
            <App></App>  
            </div>
            `
})
