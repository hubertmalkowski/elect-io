<template>
<section class="login-form-header">
  <div>
    <h1>Elect.io</h1>
    <span>Twój głos ma kluczowe znaczenie</span>
  </div>

</section>
</template>

<script setup lang="ts">

</script>

<style scoped>

@media screen and (min-width: 960px) {
  .login-form-header {
    background-color: var(--Color-Primary-500);


  }
  h1 {
    font-size: 96px !important;
    color: var(--Background) !important;

  }
  span {
    display: initial !important;
    font-size: 48px;
    font-weight: 600;
    line-height: 58px;
    letter-spacing: 0em;
    color: var(--Background);

  }
}

span {
  display: none;
}


h1 {
  margin: 0;

  color: var(--Color-Primary-500);
  font-size: 40px;

}
.login-form-header {
  height: 100%;
  width: 100%;

  display: flex;
  padding-left: 14px;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}



</style>