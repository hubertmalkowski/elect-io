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
  flex-direction: column;
  height: 100vh;
  padding-inline: 16px;
}

@media screen and (min-width: 960px) {
  .loginLayout {
    flex-direction: row;
    padding: 0;
  }
  .loginHeader {
    width: 100%;
    height: 100%;
  }

}


@media screen and (max-width: 959px) {
  .loginHeader {
    width: 100%;
    height: 10%;
  }
}


.slot {
  width: 100%;
  height: 100%;
}


</style>