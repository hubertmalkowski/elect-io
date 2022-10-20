<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import app from "../FirebaseInit";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider
  } from "firebase/auth";

  const auth = getAuth(app);

  const email = ref<string>("")
  const password1 = ref<string>("")
  const password2 = ref<string>("")

  const username = ref("")

  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
        })
        .catch((error) => {
          const errorMessage = error.message


        })
  }

  function register() {
    if (password1.value != password2.value) {
      return
    }
    createUserWithEmailAndPassword(auth, email.value, password1.value)
      .then((userCredential : any) => {
        // Signed in 
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username.value
        })
        // ...
      })
      .catch((error : any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const form = ref<HTMLElement | null>(null)

  onMounted(() => {
    form.value!.onsubmit = (event) => {
      event.preventDefault()
      register()
    }
  })

</script>

<template>
  <form class="form" ref="form">

    <section class="login-form">

      <div class="input-wrap">
        <sl-input v-model="username" label="Nazwa użytkownika" type="text" required></sl-input>
        <sl-input v-model="email" label="Email" type="email" required></sl-input>
        <sl-input v-model="password1" label="Hasło" type="password" required password-toggle></sl-input>
        <sl-input v-model="password2" label="Powtórz hasło" type="password" required password-toggle></sl-input>
      </div>

      <div class="button-wrap">

        <sl-button @click="register" size="large" pill variant="primary" >Zarejestruj</sl-button>
      </div>

      <sl-button @click="signInWithGoogle">Sign in with google</sl-button>


      <!-- not necessary right now -->
      <!-- <sl-button>Register with google</sl-button> -->
      <!-- <sl-button>Register with facebook</sl-button> -->
      <span>Masz już konto? <router-link to="/login">Zaloguj</router-link></span>
    </section>
  </form>


</template>

<style scoped>

</style>