<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {useUser} from "@/stores/user"
import LoginLayout from "@/layouts/LoginLayout.vue"
import HomeLayout from "@/layouts/HomeLayout.vue"
import {ref, watch} from "vue"

import {getAuth, onAuthStateChanged} from "firebase/auth"
import app from "./FirebaseInit"

const auth = getAuth(app)
auth.useDeviceLanguage();

// const user = useUser()



//Router control
const router = useRouter()
const route = useRoute()

onAuthStateChanged(auth, (user : any) => {
  if (user){
    ("User logged in! redirecting...");

    router.push("/")
  } else {
    ("User not logged in! redirecting...");
    router.push("/login")
  }
})



const user = auth.currentUser

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
    <RouterView v-slot="{ Component }">
      <transition mode="out-in">
        <component :is="Component"/>
      </transition>
    </RouterView>
  </HomeLayout>

</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
