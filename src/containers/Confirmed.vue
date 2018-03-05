<template>
  <div class="confirmed">
    <h1>We'll be here in a sec</h1>

    <p>The taxi will be here soon, compare the code below with the driver's before taking off.</p>

    <div class="code">DJ72E</div>

    <div class="cancel"><router-link to="/customer" class="cancelLink">cancel</router-link></div>
  </div>
</template>

<script>
  export default {
    mounted() {
      socket.on('orderFinished', (orderId) => {
        if(orderId == localStorage.getItem('orderId')) {
          window.router.push("done");
        }
      });
    }
  }
</script>

<style scoped>
  .confirmed {
    width: 100%;
    height: 100%;
    color: white;
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    padding-top: 15%;
    padding-left: 2em;
    padding-right: 2em;
  }

  h1 {
    font-size: "Oxygen";
    font-weight: 300;
  }

  p {
    font-size: 1.5em;
    font-weight: 300;
  }

  .code {
    font-family: consolas;
    width: 100%;
    text-align: center;
    font-size: 4em;
    margin-top: 10%;
    text-shadow: 0 0 20px rgba(0,0,0,0.5);
  }

  .cancel {
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    bottom: 10%;
  }

  .cancelLink {
    color: rgb(230,230,230);

    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid rgba(230,230,230,0.2);
    border-radius: 1px;
  }
</style>
