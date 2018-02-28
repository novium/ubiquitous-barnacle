/*jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Pick arbitrary port for server
var port = 3000;
app.set('port', (process.env.PORT || port));

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
function Data() {
  this.orders = [];
  this.taxis = [
    {id: 0, x: 0, y: 0},
    {id: 1, x: 1, y: 1},
    {id: 2, x: 2, y: 2}
  ];
  this.currentOrderNumber = 0;
}


Data.prototype.getOrderNumber = function () {
  this.currentOrderNumber += 1;
  return this.currentOrderNumber;
};

/*
  Adds an order to to the queue
*/
Data.prototype.addOrder = function (order) {
  var orderId = this.getOrderNumber();
  //Store the order in an "associative array" with orderId as key
  this.orders[orderId] = order;
  return orderId;
};

/*
  Just deleting the order when it's finished
*/
Data.prototype.finishOrder = function (orderId) {
    delete this.orders[orderId];
};

/*
  Only needs to know orderId. The rest is up to the client to decide
*/
Data.prototype.updateOrderDetails = function (order) {
  for (var key in order) {
    this.orders[order.orderId][key] = order[key];
  }
};

Data.prototype.getAllOrders = function () {
  return this.orders;
};

Data.prototype.addTaxi = function (taxi) {
  //Store the order in an "associative array" with orderId as key
  this.taxis[taxi.taxiId] = taxi;
};

Data.prototype.updateTaxiDetails = function (taxi) {
  for (var key in taxi) {
    this.taxis[taxi.taxiId][key] = taxi[key];
  }
};

Data.prototype.removeTaxi = function (taxiId) {
    delete this.taxis[taxiId];
};

Data.prototype.getAllTaxis = function () {
  return this.taxis;
};


var data = new Data();

io.on('connection', function (socket) {
  console.log("A user connected");

  // Send list of orders when a client connects
  socket.emit('initialize', { orders: data.getAllOrders(),
                              taxis: data.getAllTaxis() });
  // Add a listener for when a connected client emits an "orderTaxi" message
  socket.on('orderTaxi', function (order) {
    var orderId = data.addOrder(order);
    order.orderId = orderId;
    // send updated info to all connected clients, note the use of "io" instead of "socket"
    io.emit('taxiOrdered', order);
    // send the orderId back to the customer who ordered
    socket.emit('orderId', orderId);
  });
  socket.on('addTaxi', function (taxi) {
    data.addTaxi(taxi);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('taxiAdded', taxi);
  });
  socket.on('moveTaxi', function (taxi) {
    data.updateTaxiDetails(taxi);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('taxiMoved', taxi);
  });
  socket.on('taxiQuit', function (taxi) {
    data.removeTaxi(taxi);
    console.log("Taxi",taxi,"has left the job");
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('taxiQuit', taxi);
  });
  socket.on('finishOrder', function (orderId) {
    data.finishOrder(orderId);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('orderFinished', orderId);
  });

  socket.on('taxiAssigned', function(order) {
    data.updateOrderDetails(order);
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });
  socket.on('orderAccepted', function(order) {
    data.updateOrderDetails(order);
    io.emit('orderAccepted', order );
  });
});

var server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
