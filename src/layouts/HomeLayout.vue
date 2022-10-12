<template>
  <div>
    <desktop>
      <slot/>
    </desktop>
  </div>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Desktop from "@/layouts/homeResponsive/desktop.vue";

const mobile = ref<boolean>(false)
mobile.value = ifMobile()
onMounted(() => {

  window.addEventListener("resize", ()=>{
    ("stuff")
    (ifMobile())
    mobile.value = ifMobile()
  })
})

function ifMobile() {
  return window.innerWidth <= 960;
}

</script>

<style scoped>

</style>