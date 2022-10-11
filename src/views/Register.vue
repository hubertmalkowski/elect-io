<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import app from "../FirebaseInit";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  const email = ref<string>("")
  const password1 = ref<string>("")
  const password2 = ref<string>("")

  const username = ref("")

  function register() {
    if (password1.value != password2.value) {
      return
    }
    createUserWithEmailAndPassword(getAuth(app), email.value, password1.value)
      .then((userCredential : any) => {
        // Signed in 
        const user = userCredential.user;
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
        <sl-input v-model="username" label="Nazwa użytkownika" type="email" required></sl-input>
        <sl-input v-model="email" label="Email" type="email" required></sl-input>
        <sl-input v-model="password1" label="Hasło" type="password" required password-toggle></sl-input>
        <sl-input v-model="password2" label="Powtórz hasło" type="password" required password-toggle></sl-input>
      </div>

      <div class="button-wrap">
        <router-link to="/login">
          <sl-button type="submit" size="large" pill variant="primary" outline>Zaloguj</sl-button>
        </router-link>
        <sl-button @click="register" size="large" pill variant="primary" >Zarejestruj</sl-button>
      </div>

      <!-- not necessary right now -->
      <!-- <sl-button>Register with google</sl-button> -->
      <!-- <sl-button>Register with facebook</sl-button> -->

    </section>
  </form>


</template>

<style scoped>

</style>