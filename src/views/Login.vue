<script lang="ts" setup>
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import {ref} from "vue";



</script>




<template>
  <form class="form">

  <section class="login-form">
    <div class="input-wrap">
      <sl-input label="Email" type="email" required></sl-input>
      <sl-input label="Hasło" type="password" required password-toggle></sl-input>
    </div>
    <div class="button-wrap">
      <router-link to="/register">
        <sl-button type="submit" size="large" pill variant="primary" outline>Zarejestruj</sl-button>

      </router-link>
      <sl-button type="submit" size="large" pill variant="primary" >Zaloguj</sl-button>
    </div>
  </section>
  </form>


</template>


<style scoped>



</style>