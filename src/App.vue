<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {useUser} from "@/stores/user";
import LoginLayout from "@/layouts/LoginLayout.vue";
import {ref, watch} from "vue";

const user = useUser()



//Router control
const router = useRouter()
const route = useRoute()



//Layout control
let layoutMap = ref<Map<string, boolean>>(new Map())
layoutMap.value.set("login", false)
layoutMap.value.set("main", true)

watch(() => route.name, () => {
  if (route.name == "login" || route.name == "register") {
    layoutMap.value.set("main", false)
    layoutMap.value.set("login", true)
  }
  else  {
    layoutMap.value.set("main", true)
    layoutMap.value.set("login", false)
  }
})







</script>

<template>


  <LoginLayout>
    <RouterView />


  </LoginLayout>
</template>

<style scoped>

</style>
