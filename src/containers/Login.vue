<template>
  <div class="login">
 <form action="action_page.php">
  <div class="loginScreen">
    <div id="loginText">
      <h1>
    WAIT UP
    </h1> Cool that you decided to
      <br> order a taxi with us.
      <br> Before you continue on your
      <br> journey we need some more info.
    </div>
 
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>

      <button v-on:click="submit" id="loginButton">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>

      <div class="container" id="reg">
        <button v-on:click="create" id="regButton">Register</button>
        <span class="psw">Forgot <a href="#">password?</a></span>
      </div>
    </div>
    </div>
</form>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
 form {
  border: 3px solid #f1f1f1;
  background-color: orange;
}

.loginScreen {
  margin: 60px;
  height: 800px;
}

input[type=text],
input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
}

#loginButton {
  width: 40%;
  float: right;
}

button:hover {
  opacity: 0.8;
}

#regButton {
  width: 100%;
  float: center;
}

.container {
  margin: 30px;
}

#reg {
  position: relative;
  top: 100px;
}

#loginText {
  color: white;
  margin: 30px;
  font-size: 25px;
  font-weight: bold;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>
