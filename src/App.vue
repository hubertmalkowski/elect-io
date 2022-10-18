<script setup lang="ts">
import {RouterLink, RouterView, useRoute, useRouter} from 'vue-router'
import {useUser} from "@/stores/user"
import LoginLayout from "@/layouts/LoginLayout.vue"
import HomeLayout from "@/layouts/HomeLayout.vue"
import {ref, watch} from "vue"
import '@shoelace-style/shoelace/dist/components/alert/alert';
import '@shoelace-style/shoelace/dist/components/icon/icon';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import app from "./FirebaseInit"
import {useUserActionStatus} from "@/stores/status";
import {SlAlert} from "@shoelace-style/shoelace";

const auth = getAuth(app)
auth.useDeviceLanguage();

// const user = useUser()



//Router control
const router = useRouter()
const route = useRoute()

const userActionStatus = useUserActionStatus()

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


//Layout watcher
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


const successToast = ref<SlAlert | null>(null)
const votedToast = ref<SlAlert | null>(null)

//Status watcher
userActionStatus.$subscribe((mutation, state) => {
  if (state.status == "addedPoll") {
    successToast.value!.toast()
  }

  switch (state.status) {
    case "addedPoll":
      successToast.value!.toast(); break;
    case "voted":
      votedToast.value!.toast(); break;


  }
})






</script>

<template>

  <sl-alert variant="success" duration="5000" closable ref="successToast">
    <sl-icon slot="icon" name="check2-circle"></sl-icon>
    <strong>Dodano twój sondaż :)</strong><br />
    Teraz się zrelaksuj i poczekaj na wyniki sondażu
  </sl-alert>
  <sl-alert variant="success" duration="5000" closable ref="votedToast">
    <sl-icon slot="icon" name="check-circle"></sl-icon>
    <strong>Dziękujemy za głos :)</strong><br />
    Twój głos zostanie usłyszany :)
  </sl-alert>


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
