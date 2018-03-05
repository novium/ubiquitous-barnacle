<template>

<div id="page">
      <div id="my-map" v-on="initializeMaps()">
       <Map ref="map" />
          <div id="driverBox" v-on="initialize()" >
      <div id="driverName">
        
      </div>
      <div>
       
      </div>
          </div>
     
      
      </div>

      <!--Bar where current job, next job and outside conditions aswell as clock shows-->
      <div class="orderBar">
        
        <div class="column leftleftleft">
          <ul>
          <th valign="top">
          Rate out of 3
        </th>
          
            <div id="buttons">
              <form v-on:submit="rate">
              <button class="btn Fin" name="buttonFin" Style id="1">1</button>
              <button class="btn Fin" name="buttonFin" Style id="2">2</button>
              <button class="btn Fin" name="buttonFin" Style id="3">3</button>
              </form>
            </div>
            </ul>
          <ul>
            
              
             
            </ul>
            
        </div>
          
        


        <div class="column leftleft">
        <ul> 
        <th valign="top">
        Current job
        </th>
            <div id="analyze">

            </div>
            <div  v-for="order in orders" v-if="order.taxiId == taxiId">
              # {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
              </ul>
            </div>
        

        <form v-on:submit="finish">
        <button class="btn Fin" name="buttonFin" >Finish job</button>
        </form>
          </ul>
        </div>
  
  
        <div class="column left">
        <ul>  
        <th valign="top">
        Next job
        </th>
        <div id="job">

        </div>
            <div v-for="order in orders" v-if="order.taxiId == taxiId">
              ID {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
              </ul>
              
            </div>
            
          </ul>
        </div>
        
  
         <div class="column right">
          <ul>
          <th valign="top">
          Trip info
          </th>
            
          </ul>
        </div>
  
  
        <div class="column rightright">
        <ul>
        <th valign="top">
        Job request
        </th>  
            <div v-for="order in orders" v-if="order.taxiId == taxiId">
              # {{ order.orderId}} From: {{ order.fromLatLong[0].toFixed(3) }}, {{ order.fromLatLong[1].toFixed(3) }} Destination: {{ order.destLatLong[0].toFixed(3) }}, {{ order.destLatLong[1].toFixed(3) }}
              <ul>
                <li v-for="item in order.orderItems">
                  {{ item }}
                </li>
                </ul>
                <ul>
            
              
          
            </ul>
            </div>
            <div id="order">

            </div>
            <div id="buttonmain">
            <div class="floatdiv">
            <form v-on:submit="accept">
              
              <button class="btn Acc" name="buttonAcc" v-on:click="acceptOrder(order)">Accept</button>
              </form>
            </div>
            <div class="floatdiv">
                <form v-on:submit="decline">
              <button class="btn Dec" name="buttonDec" v-on:click="declineOrder(order)">Decline</button>
            </form>
            </div>
            </div>
          </ul>
          </div>

          <div class="column rightrightright">
            <ul>
            
     
              <form v-on:submit="option">
              <button class="btn Fin" name="buttonFin" Style v-on:click="optionPopup">Option</button>
              </form>
          
            </ul>
          <ul>
            
              <form v-on:submit="logout">
              <button class="btn Fin" name="buttonFin" Style v-on:click="optionPopup">Signout</button>
              </form>
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
        orders: [],
        taxis: undefined,
        position: undefined,
        orderID: undefined
      }
    },
    created() {
    var socket = io('http://localhost:3000');

    socket.on('connect', function () {
      console.log("Connected to socket.");
    });
    },
    mounted(){
      this.$refs.map.$on('load', this.mapLoad);
      navigator.geolocation.getCurrentPosition((pos) => {
      this.$data.position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
    });
      
    },
    methods: {
      initialize(){
        
        socket.on('initialize', function(info){
          //console.log(info.orders[0]);
          
          
            this.orders = info.orders;
            this.orderID = info.orders[0].id;
            this.taxis = info.taxis[0];
           
            $("#driverName").html("<p> TaxiID: " +this.taxis.id + "</p>");
            $("#analyze").html("<p>Ordernumber: " + this.orderID + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
            $("#job").html("<p>Ordernumber: " + this.orders[1].id + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
            $("#order").html("<p>Ordernumber: " + this.orders[2].id + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
        });
      },
      initializeMaps(){
        navigator.geolocation.getCurrentPosition((pos) => {
        this.$data.position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
        
        this.$refs.map.clearMarkers();
        $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');

        if(this.$data.destination) {
          this.$refs.map.addMarker(this.$data.destination);
        }
      });
      },
      accept(){
        
        socket.emit('accept', function() {
        });
      },
      decline(){
        
        socket.emit('decline', function() {
        });
      },
      finish(){

      },
      logout(){
        socket.on('taxiQuit', function (taxiid){

        });
      },
      start(){},
      rate(){

      },
      option(){
        console.log("it works");
      },
      mapLoad() {
      $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
    }
    },
    components: {
      Map
    },

    props: ['order', 'taxis', 'data']
  }
</script>

<style scoped>
  #page {
  margin: 0;
  background-color: DimGray;
  height: 100%

}

#buttonmain{
position:relative;
    width:210px;
}

th {
    position:relative;
  top:-15px;
    border :1px solid black;
    font-size: 10px;
}
#my-map {
  padding-bottom: 10px;
  width: 100%;
  height: 90vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  margin: 1em auto;
  position:absolute;
  position: top;
  top:-16px;
}

#driverBox {
  float: right;
  position:absolute;

  top:0;
  display: table;
  margin: 0 auto;
}

#driverName {
  font-size: 8px;
  color: yellow;
  margin: 1px;
  background-color: black;
  width: 150px;
  height:13px;
  float: right;
  
}
ul, li {
    top: auto;
    margin: 8px; 
    padding: 8px;
}


.column {
  float: left;
}

.leftleftleft {
  margin-right: 2px;
  width: 15%;

  color: white;
}

.leftleft {
  width: 14%;

  color: white;
}

.left {
  width: 14%;

  color: white;
}

.right {
  width: 15%;

  color: white;
}
.rightright {
  width: 26%;

  color: white;
}

.rightrightright {
  width: 10%;

  color: white;
}
.floatdiv{
  float:left;
  width:100px;
}
/* Clear floats after the columns */

.orderBar {
  content: "";
  display: table;
  font-size: 8px;
 
  clear: both;
  background-color:black;
  width: 100%;
  height:11%;
  bottom: 0;
  position: absolute;
}

button {
    border: none;
    padding: 1px 1px;
    text-align: center;
    display: block;
    font-weight: Bold;
    font-size: 12px;
    position: relative;
    bottom: 10%;
    right: 5%;
    top:2px;
}


.Opt {background-color: #e7e7e7; color: black; font-size: 10px; width: 45px; height: 17px; margin: 5px;}
.Sig {background-color: #e7e7e7; color: black; float: right; font-size: 10px; width: 45px; height: 17px; margin: 0px 5px;}
.Fin {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Sta {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Acc {background-color: #4CAF50; width: 70px; height: 30px; margin: 5px;}
.Dec {background-color: #f44336; width: 70px; height: 30px; margin: 5px;} 


form {
  display: inline;
}
.popup-list {
  padding-left: 100;

  }
</style>

<style>
.customer {
  background-image: linear-gradient(-60deg, rgb(255, 80, 0) 0%, rgb(255, 114, 4) 100%);
  border-radius: 100%;
  box-shadow: 0 0 10px rgb(255, 80, 0);
  width: 42px;
  height: 42px;
  color: rgb(240, 240, 240);
  font-family: "Oxygen";
  text-align: center;
  padding-top: 8px;
  font-size: 16px;
}
.buttons{
    border: none;
    background: none;
    text-transform: uppercase;
    height: 100%;
    font-weight: 700;
    color: black;
    letter-spacing: 1px;
    font-size: inherit;
    transition: all 0.3s;
    outline: none;
}
</style>