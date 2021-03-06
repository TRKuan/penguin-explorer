/* eslint-disable */
import Vue from 'vue'
import VueFire from "vuefire";
import App from './App.vue'
import router from './router'
import {auth} from "./firebaseConfig";
const fb = require('./firebaseConfig.js')
import firebase from 'firebase'
import * as VueGoogleMaps from "vue2-google-maps";
import {gmapApi} from 'vue2-google-maps'
//style
import 'bootstrap';import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './registerServiceWorker'
library.add(faStar, faAngleDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDwLDlQ82BrKXcU930SJOoZWcj4_zVY4FU",
    libraries: "places"
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
