<script lang="ts" setup>
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {onMounted, ref} from "vue";

import app from "../FirebaseInit"
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";

const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth(app);

const login = ref<string>("")
const password = ref<string>("")

const error = ref<string>("")

async function signIn() {

  signInWithEmailAndPassword(auth, login.value, password.value)
  .then((userCredential : any) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error : any) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    error.value = errorMessage
  });
}

function signInWithGoogle() {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
  })
  .catch((error) => {
    const errorMessage = error.message


  })
}

const form = ref<HTMLElement | null>(null)

onMounted(() => {


  form.value!.onsubmit = (event) => {
    event.preventDefault()
    signIn()
  }
})


</script>




<template>
<!-- @TODO
    make form not submit with a button
-->
<form class="form" ref="form">
  <section class="login-form">
    <div class="input-wrap">
      <sl-input v-model="login" label="Email" type="email" required></sl-input>
      <sl-input v-model="password" label="Hasło" type="password" :help-text="error" required password-toggle></sl-input>
    </div>
    <div class="button-wrap">

      <sl-button @click="signIn" size="large" pill variant="primary" >Zaloguj</sl-button>
    </div>

    <sl-button @click="signInWithGoogle">Sign in with google</sl-button>
    <!-- <sl-button>Register with facebook</sl-button> -->
    <span>Nie masz konta? <router-link to="/register">Zarejestruj</router-link></span>

  </section>

</form>


</template>


<style scoped>



</style>