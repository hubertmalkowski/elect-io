<template>
  <section class="loginLayout">
    <div class="loginHeader"><LoginFormHeader/></div>

    <div class="slot">
      <slot/>
    </div>

  </section>

</template>

<script setup lang="ts">

import LoginFormHeader from "@/components/LoginFormHeader.vue";
</script>

<style scoped>
.loginLayout {
  display: flex;
  height: 100vh;
}

@media screen and (min-width: 960px) {

  .loginHeader {
    width: 100%;
  }
  .slot {
    width: 100%;
    height: 100%;
  }
}

</style>