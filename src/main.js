import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filters";
import currencyFilter from "./filters/currency.filter";
import messagePlagin from "./utils/message.plugin";
import Loader from "./components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlagin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: "AIzaSyAT10CtquSjUuYPKaqSLs1jtqD_Fj79Yts",
  authDomain: "finance-c0358.firebaseapp.com",
  databaseURL: "https://finance-c0358.firebaseio.com",
  projectId: "finance-c0358",
  storageBucket: "finance-c0358.appspot.com",
  messagingSenderId: "881065337525",
  appId: "1:881065337525:web:d581913628de7c4ba914fc"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
