<template>

<div id="page">
      <div id="my-map">
       <Map ref="map" />
          <div id="driverBox">
      <h4 id="driverName">
      TAXI DRIVER # {{ taxiId }}
      </h4>
      <div>
       
      </div>
          </div>
     
      
      </div>

      <!--Bar where current job, next job and outside conditions aswell as clock shows-->
      <div class="orderBar">
        
        <div class="column leftleftleft">
          <ul>
              <button class="btn Fin" name="buttonFin" Style v-on:click="optionPopup">Option</button>
            </ul>
            </div>
          
        


        <div class="column leftleft">
        <ul> 
        <h6>
        Current job
        </h6>
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
        <h6>
        Next job
        </h6>
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
          <h6>
          Trip info
          </h6>
            
          </ul>
        </div>
  
  
        <div class="column rightright">
        <ul>
        <h6>
        Job request
        </h6>  
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
          <div class="column rightrightright">
          <ul>
              <button class="btn Fin" name="buttonFin" Style v-on:click="optionPopup">Signout</button>
            </ul>
            </div>
      </div>
    </div>
  
</template>

<script>
  import Map from '../components/Map.vue'
import Vue from 'vue'
  export default {
    data () {
      return {
        orders: []
        
      }
    },
    created() {
    socket.on('connect', function () {
        console.log("Connected to socket.");
      });
      
    
  },
    components: {
      Map
    },

    props: ['orders']
  }
</script>

<style scoped>
  #page {
  margin: 0;
  padding: 0;
  background-color: DimGray;
  height: 100%
}

#my-map {
  padding-bottom: 10px;
  width: 100%;
  height: 80vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  margin: 1em auto;
  position:absolute;
  position: top;
}

#driverBox {
  float: right;
  position:absolute;

  top:0;
  display: table;
  margin: 0 auto;
}

#driverName {
  font-size: 10px;
  color: yellow;
  margin: 1px;
  background-color: black;
  width: 150px;
  height:13px;
  float: right;
  
}

.column {
  float: left;
}

.leftleftleft {
  margin-right: 20px;
  width: 12%;

  color: white;
}

.leftleft {
  width: 17%;

  color: white;
}

.left {
  width: 17%;

  color: white;
}

.right {
  width: 17%;

  color: white;
}
.rightright {
  width: 17%;

  color: white;
}

.rightrightright {
  width: 12%;

  color: white;
}

/* Clear floats after the columns */

.orderBar {
  content: "";
  display: table;
  font-size: 10px;
  border-spacing: 0px;
  clear: both;
  background-color:black;
  width: 100%;
  bottom: 0;
  position: absolute;
}

button {
    border: none;
    padding: 2px;
    text-align: center;
    display: inline-block;
    font-weight: Bold;
    font-size: 16px;
    position: absolute;
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
</style>
