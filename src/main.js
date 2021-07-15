import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.min.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyBwW0XyOwzLCyr7MXpL8aOWCdzOLr3x0N4",
  authDomain: "vue2-first-project.firebaseapp.com",
  databaseURL: "https://vue2-first-project-default-rtdb.firebaseio.com",
  projectId: "vue2-first-project",
  storageBucket: "vue2-first-project.appspot.com",
  messagingSenderId: "868909121501",
  appId: "1:868909121501:web:bfcf1b84416b41657f8034",
});

/* firebase.auth().onAuthStateChanged (() => {}) */ //Иннициализация VUE после атворизации

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
