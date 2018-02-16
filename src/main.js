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

import Home from './components/Home.vue';


Vue.use(VueRouter);


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
    ]}
];

const router = new VueRouter({
  routes
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
