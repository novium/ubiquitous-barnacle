<template>
<div>
<!-- <div id="page">
      <div id="my-map" v-on="initializeMaps()">
       <Map ref="map" />
          <div id="driverBox" v-on="initialize()" >
      <div id="driverName">
        Driver ID: {{ taxi.taxiId }}
      </div>
      <div>

      </div>
          </div>


      </div>

      <div class="orderBar">

        <div class="column leftleftleft">
          <ul>
          <th valign="top">
          Rate out of 3
        </th>

            <div id="buttons">
              <form v-on:submit="rate">
              <button id="1" class="btn1" name="buttonFin" Style>1</button>
              <button id="2" class="btn2" name="buttonFin" Style >2</button>
              <button id="3" class="btn3" name="buttonFin" Style>3</button>
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
            <input type="text" id="custnum" name="Customer number" placeholder="Custumer number">
           <button class="btn prin" name="buttonPrin">Print receipt</button>
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
    </div> -->

    <div class="overlay">
      <div id="driverName">
        Driver ID: {{ taxi.taxiId }}
      </div>

      <div class="orderBar">
        <div class="row orderBarGrid">
            <div class="col-sm-7">
              <div v-if="order.status == 1 || order.status == 2">
                <h3>Order Info</h3>
                <ul>
                  <li><b>Destination:</b> {{order.whereTo}}</li>
                  <li><b>Passengers:</b> {{order.passengers}}</li>
                  <li><b>Luggage:</b> {{order.luggage}}</li>
                </ul>
              </div>
            </div>

            <div class="col-sm-3">
              <h4>Status</h4>
              <div v-if="order.status == 2">
                <p>Driving</p>
                <button class="btn btn-primary Acc" name="buttonAcc" v-on:click="finish">Finish</button>
              </div>

              <div v-if="order.status == 1">
                <p>Do you want to accept?</p>
                <button class="btn btn-success" name="buttonAcc" v-on:click="accept">Accept</button>
                <button class="btn btn-danger" name="buttonDec" v-on:click="decline">Decline</button>
              </div>

              <div v-if="order.status == -1">
                <p>Waiting for a job</p>
              </div>
            </div>

            <div class="col-sm-1">
              <button class="btn Fin" name="buttonFin">Option</button>
              <button class="btn Fin mt-2" name="buttonFin">Signout</button>
            </div>
        </div>
      </div>
    </div>

    <Map id="map" ref="map" />

    <div class="modal fade" id="fardtjanstModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Färdtjänst CustomerID</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" placeholder="CardID ############">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-block btn-primary" data-dismiss="modal">OK</button>
          </div>
        </div>
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
        taxiId: -1,
        taxis: [],
        taxi: {},
        order: {
          whereTo: '',
          passengers: undefined,
          luggage: undefined,
          price: undefined,
          taxiId: undefined,
          status: -1,

          profile: {
            pets: undefined,
            allergies: undefined,
            wheelchair: undefined,
            childseating: undefined,
            medicaltransport: undefined,
            fardtjanst: undefined
          },

          destination: undefined,
          position: undefined,
          distance: undefined,
          time: undefined,
          specify: undefined
         },
        position: undefined,
        orderID: undefined,
        actualOrder: undefined,
        nextOrder: undefined,
        suggestedOrder: undefined,
        myOrders: undefined,
        orderIndex: undefined,
        rateNumber: undefined,
        customerRating: [],
        customerIndex: 0
      }
    },

    created() {
      socket.emit('initialize');

      socket.on('initialize', function(data) {
        this.orders = data.orders;
        this.taxis = data.taxis;
      });

      socket.on('taxiAddedExtra', (taxi) => {
        this.$data.taxis[taxi.taxiId] = taxi;
        this.$data.taxiId = taxi.taxiId;
        this.$data.taxi = taxi;
      });

      navigator.geolocation.getCurrentPosition((pos) => {
        this.$data.position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
        socket.emit('addTaxi', {
          pos: this.$data.position,
          name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
        });
      });
    },

    mounted(){
      //this.$refs.map.$on('load', this.mapLoad);
      socket.on('currentQueue', (orders) => {
        this.$data.orders = orders.orders;


        let order = orders.orders.find((val) => { return (val.taxiId == this.$data.taxiId) && (val.status == 1 ) });

        if(order) {
          this.orderID = order.orderId;
          Vue.set(this, "order", order);
          this.$refs.map.flyTo(this.order.position);
          this.$refs.map.addMarker(this.order.position);
        }
      });

      this.$refs.map.$on('click', this.mapClick);
    },
    methods: {
      initialize(){
            //$("#driverName").html("<p> TaxiID: " +this.taxis.id + "</p>");
            //$("#analyze").html("<p>Ordernumber: " + this.orderID + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
            //$("#job").html("<p>Ordernumber: " + this.orders[1].id + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
            //$("#order").html("<p>Ordernumber: " + this.orders[2].id + "</p> <p>From: somewhere</p> <p>To: nowhere</p>");
      },
      initializeMaps(){
        //this.$refs.map.clearMarkers();
        //$(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');

        //if(this.$data.destination) {
        //  this.$refs.map.addMarker(this.$data.destination);
        //}
      },
      accept(){
        this.order.status = 2;
        socket.emit('orderAccepted', this.order);
      },
      decline(){
        this.order.status = 0;
        this.order.taxiId = undefined;
        socket.emit('orderAccepted', this.order);
                this.order = {
          whereTo: '',
          passengers: undefined,
          luggage: undefined,
          price: undefined,
          taxiId: undefined,
          status: -1,

          profile: {
            pets: undefined,
            allergies: undefined,
            wheelchair: undefined,
            childseating: undefined,
            medicaltransport: undefined,
            fardtjanst: undefined
          },

          destination: undefined,
          position: undefined,
          distance: undefined,
          time: undefined,
          specify: undefined
         };

         this.orderID = -1;
socket.emit('initialize');
      },
      finish(){
        if(this.order.profile.fardtjanst) {
          $('#fardtjanstModal').modal();
        }

        socket.emit('finishOrder', this.order.orderId);
        this.order = {
          whereTo: '',
          passengers: undefined,
          luggage: undefined,
          price: undefined,
          taxiId: undefined,
          status: -1,

          profile: {
            pets: undefined,
            allergies: undefined,
            wheelchair: undefined,
            childseating: undefined,
            medicaltransport: undefined,
            fardtjanst: undefined
          },

          destination: undefined,
          position: undefined,
          distance: undefined,
          time: undefined,
          specify: undefined
         };

         this.orderID = -1;
socket.emit('initialize');
      },
      logout(){
        
        socket.on('taxiQuit', {taxis: this.$data.taxiid}

        );
      },
      start(){},
      rate(){
        $(document).ready(function(){
      $(".btn1").click(function(evt){
          this.$data.rateNumber = $(this).attr("id");
          
      });
     });
        $(document).ready(function(){
      $(".btn2").click(function(evt){
          this.$data.rateNumber = $(this).attr("id");
          
      });
     });
        $(document).ready(function(){
      $(".btn3").click(function(evt){
          this.$data.rateNumber = $(this).attr("id");
          
      });
     });
          var rate = {taxis: this.taxis.id, actualOrder: this.actualOrder, rateNumber: this.rateNumber};
          
          socket.emit('transferRatings', function(rate){
          });
      },
      option(){
        console.log("it works");
      },
      mapLoad() {
        $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
      },
      mapClick(lngLat) {
        this.taxi.pos = lngLat.lngLat;
        this.$refs.map.clearMarkers();
        this.$refs.map.addMarker(this.taxi.pos);

        socket.emit('moveTaxi', this.taxi);
      }
    },

    components: {
      Map
    }
  }
</script>

<style scoped>
  #page {
  margin: 0;
  background-color: DimGray;
  height: 100%
}

  .row {
    margin-right: 0;
  }

  .orderBarGrid {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  #map {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

#buttonmain{
position:relative;
    width:210px;
    position: relative;

  bottom:20px;
}


#my-map {
  width: 100%;
  height: 100%;
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
  color: white;
  padding-top: 3px;
  padding-left: 8px;
  padding-right: 20px;
  padding-bottom: 8px;
  border-bottom-left-radius: 0.8em;
  margin: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  float: right;
  font-size: 1.5em;
}


.column {
  float: left;
}

.leftleftleft {
  margin-right: 2px;
  width: 10%;

  color: white;
}

.leftleft {
  width: 20%;

  color: white;
}

.left {
  width: 20%;

  color: white;
}

.right {
  width: 15%;

  color: white;
}
.rightright {
  width: 22%;

  color: white;
}

.rightrightright {
  width: 10%;

  color: white;
}
.floatdiv{
  float:left;
  width:70px;
}
/* Clear floats after the columns */

.orderBar {
  content: "";
  display: table;
  pointer-events: all;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  color: white;

  clear: both;
  background-color:rgb(29, 29, 29);
  width: 100%;
  height: 10em;
  bottom: 0;
  position: absolute;
}

.orderBar ul {
  list-style: none;
  padding-left: 5px;
}

/* button {
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
} */


/* .Opt {background-color: #e7e7e7; color: black; font-size: 10px; width: 45px; height: 17px; margin: 5px;}
.Sig {background-color: #e7e7e7; color: black; float: right; font-size: 10px; width: 45px; height: 17px; margin: 0px 5px;}
.Fin {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Sta {background-color: #e7e7e7; color: black; width: 80px; height: 30px; margin: 5px;}
.Acc {background-color: #4CAF50; width: 70px; height: 30px; margin: 5px;}
.Dec {background-color: #f44336; width: 70px; height: 30px; margin: 5px;}  */
.prin {background-color: #e7e7e7; color: black; width: 75px; height: 30px; margin: 2px; position: relative; top: 40px; float: left;}


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