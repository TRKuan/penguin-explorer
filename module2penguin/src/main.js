import Vue from 'vue'
import VueFire from "vuefire";
import App from './App.vue'
import router from './router'
import {auth} from "./firebaseConfig";
const fb = require('./firebaseConfig.js')
import firebase from 'firebase'
Vue.use(VueFire);

Vue.config.productionTip = false
let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
  }
})
