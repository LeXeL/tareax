import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./quasar";

import firebase from "firebase/app";

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyAQxzlDgR3mY9h3Hb-JfGujaZnt5KLtw58",
  authDomain: "tareax-bfce8.firebaseapp.com",
  databaseURL: "https://tareax-bfce8.firebaseio.com",
  projectId: "tareax-bfce8",
  storageBucket: "tareax-bfce8.appspot.com",
  messagingSenderId: "686870687578",
  appId: "1:686870687578:web:d7da89818726e9e1124d63",
  measurementId: "G-DYQH5TFLRJ",
};

firebase.initializeApp(configOptions);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
