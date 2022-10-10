<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {useUser} from "@/stores/user"
import LoginLayout from "@/layouts/LoginLayout.vue"
import {ref, watch} from "vue"

import {getAuth, onAuthStateChanged} from "firebase/auth"
import app from "./FirebaseInit"

const auth = getAuth(app)

// const user = useUser()



//Router control
const router = useRouter()
const route = useRoute()

onAuthStateChanged(auth, (user) => {
  if (user){
    console.log("User logged in! redirecting...");

    router.push("/")
  } else {
    console.log("User not logged in! redirecting...");


    router.push("/login")
  }
})

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


  <LoginLayout v-if="layoutMap.get('login')">
    <RouterView />
  </LoginLayout>


  <HomeLayout v-if="layoutMap.get('main')">
    <RouterView></RouterView>
  </HomeLayout>

</template>

<style scoped>

</style>
