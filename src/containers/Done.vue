<template>
  <div class="confirmed">
    <h1>You've arrived!</h1>
    <p>Please rate your experience with your driver</p>
    <div class="stars">
      <select id="star">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  </div>
</template>

<script>
  import barrating from 'jquery-bar-rating'
  import $ from 'jquery'

  export default {
    mounted() {
      $('#star').barrating({
        theme: 'fontawesome-stars',
        initialRating: 3
      });

      $(".br-selected").each(function(i) {
        $( this ).on('click', function() {
          window.router.push("customer");
        });
      });
    }
  }
</script>

<style scoped>
  .confirmed {
    width: 100%;
    height: 100%;
    color: white;
    background-image: linear-gradient(-60deg, #0ba360 0%, #3cba92 100%);
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

  .stars {
    width: 100%;
    text-align: center;
    font-size: 3em;
  }
</style>
