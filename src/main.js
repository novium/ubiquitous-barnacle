import Vue from 'vue';
import VueRouter from 'vue-router';

import BootstrapVue from 'bootstrap-vue';

window.mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = 'pk.eyJ1Ijoibm92aXVtIiwiYSI6ImNpeGFmMzl5MzAwMTkydG54Nmw0N3Z6eGoifQ.awDpSy43luwX5rm1W8RSKA';

import io from 'socket.io-client';
window.socket = io('localhost:3000');

import App from './App.vue';

import Customer from './containers/Customer.vue';
import CustomerHome from './containers/CustomerHome.vue';

import Dispatcher from './containers/Dispatcher.vue';
import DispatcherHome from './containers/DispatcherHome.vue';

import Login from './containers/Login.vue';

import Confirmed from './containers/Confirmed.vue';
import Done from './containers/Done.vue';

import Driver from './containers/Driver.vue';
import DriverHome from './containers/DriverHome.vue';

import Home from './components/Home.vue';

Vue.use(VueRouter);

window.isLoggedIn = true;

const routes = [
  { path: '', component: Home },
  { path: '/customer', component: Customer,
    children: [
      { path: '', component: CustomerHome }
    ]
  },
  { path: '/dispatcher', component: Dispatcher,
    children: [
      { path: '', component: DispatcherHome }
  ]},
  { path: '/login', component: Login },
  { path: '/confirmed', component: Confirmed },
  { path: '/done', component: Done },

  { path: '/driver', component: Driver,
    children: [
      { path: '', component: DriverHome }
  ]}
];

window.router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
