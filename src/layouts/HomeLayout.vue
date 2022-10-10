<template>
  <div>
    <slot/>
  </div>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

const mobile = ref<boolean>(false)
mobile.value = ifMobile()
onMounted(() => {

  window.addEventListener("resize", ()=>{
    console.log("stuff")
    console.log(ifMobile())
    mobile.value = ifMobile()
  })
})

function ifMobile() {
  return window.innerWidth <= 960;
}

</script>

<style scoped>

</style>