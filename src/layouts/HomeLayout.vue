<template>
  <div>
    <mobile v-if="mobile">
      <slot/>
    </mobile>
    <desktop v-else>
      <slot/>
    </desktop>

  </div>

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import Desktop from "@/layouts/homeResponsive/desktop.vue";
import {useMobileBreakpoint} from "@/compsables/useMobileBreakpoint";
import Mobile from "@/layouts/homeResponsive/mobile.vue";

const mobile = ref<boolean>(false)
onMounted(() => {
  mobile.value = useMobileBreakpoint(window)

  window.addEventListener("resize", ()=>{
    mobile.value = useMobileBreakpoint(window)
  })
})



</script>

<style scoped>

</style>