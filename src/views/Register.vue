<template>
  <form class="form">

    <section class="login-form">
      <div class="input-wrap">
        <sl-input label="Email" type="email" required></sl-input>
        <sl-input label="Hasło" type="password" required password-toggle></sl-input>
        <sl-input label="Powtórz hasło" type="password" required password-toggle></sl-input>
      </div>
      <div class="button-wrap">
        <router-link to="/login">
          <sl-button type="submit" size="large" pill variant="primary" outline>Zaloguj</sl-button>
        </router-link>
        <sl-button type="submit" size="large" pill variant="primary" >Zarejestruj</sl-button>
      </div>
    </section>
  </form>


</template>

<script setup lang="ts">

</script>

<style scoped>

</style>