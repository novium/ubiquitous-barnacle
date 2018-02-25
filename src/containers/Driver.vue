
<template>
  <html>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TAXI DRIVER</title>
    <link rel="stylesheet" href="leaflet/leaflet.css">
    <link rel="stylesheet" href="css/taxi.css">
    <script src="/vue/vue.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/leaflet/leaflet.js"></script>
    <script src="js/driver.js" defer></script>
  </head>

  <body>
    <div id="page">
      <div id="my-map">
      <div id="driverBox">
      <h3 id="driverName">
	    TAXI DRIVER # {{ taxiId }}
      </h3>
      <div>
      <button class="btn Sig" name="buttonSig" Style v-on:click="signOut">Sign out</button>  
      </div>
          </div>
     <button class="btn Opt" name="buttonOpt" Style v-on:click="optionPopup">Option</button>
      
      </div>

      <!--Bar where current job, next job and outside conditions aswell as clock shows-->
      <div class="orderBar">
        <div class="column leftleft">
        <ul>
        
        
        <h2>
        Current job
        </h2>
          
            <div v-for="order in orders" v-if="order.taxiId == taxiId">
              # {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
              </ul>
              <button class="btn Fin" name="buttonFin" v-on:click="finishOrder(order.orderId)">Finish job</button>
            </div>
          </ul>
        </div>
        <div class="column left">
        <ul>
        
     
        <h2>
        Next job
        </h2>
     
            <div v-for="order in orders" v-if="order.taxiId == taxiId">
              # {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
              </ul>
              <button class="btn Sta" name="buttonSta" v-on:click="startNextOrder(order.orderId)">Start job</button>
            </div>
          </ul>
        </div>
        <div class="column right">
          <ul>
          <h2>
          Trip info
          </h2>
            #clock time untill arrival 
            time to destination etc

          </ul>
        </div>
        <div class="column rightright">
        <ul>
        <h2>
        Job request
        </h2>
     
            <div v-for="order in orders" v-if="order.taxiId == taxiId">
              # {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
              </ul>
              <button class="btn Acc" name="buttonAcc" v-on:click="acceptOrder(order)">Accept</button>
              <button class="btn Dec" name="buttonDec" v-on:click="declineOrder(order)">Decline</button>
            </div>
          </ul>
          </div>
      </div>
    </div>
  </body>

</html>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  body {
  margin: 0;
  padding: 0;
  background-color: DimGray;
}

#my-map {
  width: 90%;
  height: 80vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  margin: 1em auto;
}

#driverBox {
  float: right;
}

#driverName {
  font-size: 8px;
  color: white;
  padding: 2px;
  margin: 5px;
  background-color: gray;
  width: 150px;
  float: right;
  
}

.column {
  float: left;
}

.leftleft {
  width: 25%;

  color: white;
}

.left {
  width: 25%;

  color: white;
}

.right {
  width: 25%;

  color: white;
}
.rightright {
  width: 25%;

  color: white;
}


/* Clear floats after the columns */

.orderBar {
  content: "";
  display: table;
  font-size: 10px;
  border-spacing: 0px;
  clear: both;
  background-color:LightSlateGray;
}

button {
    border: none;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-weight: Bold;
    font-size: 16px;
}

.Opt {background-color: #e7e7e7; color: black; font-size: 10px; width: 45px; height: 17px; margin: 5px;}
.Sig {background-color: #e7e7e7; color: black; float: right; font-size: 10px; width: 45px; height: 17px; margin: 0px 5px;}
.Fin {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Sta {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Acc {background-color: #4CAF50; width: 70px; height: 30px; margin: 5px;}
.Dec {background-color: #f44336; width: 70px; height: 30px; margin: 5px;} 



.popup-list {
  padding-left: 100;
}
  }
</style>
