import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from 'vue-meta'
import dateFilter from "./filters/date.filters";

import titlePlagin from "./utils/title.plagin";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";

import messagePlagin from "./utils/message.plugin";
import Loader from "./components/app/Loader";
import tooltipDirectives from "./directives/toolpit-directives";
import Paginate from "vuejs-paginate";

import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlagin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(titlePlagin);
Vue.filter("date", dateFilter);
Vue.filter("localize", localizeFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirectives);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

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
