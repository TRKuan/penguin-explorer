import Vue from 'vue'
import VueFire from "vuefire";
import App from './App.vue'
import router from './router'
import {auth} from "./firebaseConfig";
const fb = require('./firebaseConfig.js')
import firebase from 'firebase'
import * as VueGoogleMaps from "vue2-google-maps";

import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDwLDlQ82BrKXcU930SJOoZWcj4_zVY4FU",
    libraries: "places" // necessary for places input
  }
});
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
