<script lang="ts" setup>
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ref} from "vue";

import app from "../FirebaseInit"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const login = ref<string>("")
const password = ref<string>("")

const error = ref<string>("")

function signIn() {

  signInWithEmailAndPassword(getAuth(app), login.value, password.value)
  .then((userCredential : any) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error : any) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    // console.log(errorMessage);
    error.value = errorMessage
  });
}

</script>




<template>
<!-- @TODO
    make form not submit with a button
-->
<!-- <form class="form"> -->
  <section class="login-form">
    <div class="input-wrap">
      <sl-input v-model="login" label="Email" type="email" required></sl-input>
      <sl-input v-model="password" label="Hasło" type="password" :help-text="error" required password-toggle></sl-input>
    </div>
    <div class="button-wrap">
      <router-link to="/register">
        <sl-button size="large" pill variant="primary" outline>Zarejestruj</sl-button>

      </router-link>
      <sl-button @click="signIn" size="large" pill variant="primary" >Zaloguj</sl-button>
    </div>

    <sl-button>Register with google</sl-button>
    <sl-button>Register with facebook</sl-button>
  </section>
  <!-- </form> -->


</template>


<style scoped>



</style>