<template>
  <section class="Navigation">

    <header>
      <h1>Elect.io</h1>

    </header>

    <nav>
      <router-link to="/" class="link">
        <div class="navItem">
          <!-- <span class="material-symbols-outlined">
            dashboard
          </span> -->
          <span class="material-symbols-outlined">
            how_to_vote
          </span>
          <div class="subtitle-1">Sondaże</div>
        </div>
      </router-link>
      <router-link to="/my-polls" class="link">
        <div class="navItem">
          <span class="material-symbols-outlined">
            note_alt
          </span>
          <div class="subtitle-1">Moje sondaże</div>
        </div>
      </router-link>
      <router-link to="/history" class="link">
        <div class="navItem">
          <span class="material-symbols-outlined">
            history
          </span>
          <div class="subtitle-1">Historia</div>
        </div>
      </router-link>
      <router-link to="/poll-add" class="link">
        <div class="navItem">
          <span class="material-symbols-outlined">
            add
          </span>
          <div class="subtitle-1">Dodaj sondaż</div>
        </div>
      </router-link>
    </nav>

    <div class="user">
      <!-- i got annoyed by that fricking warn remove when adding user display -->
      <!-- <RouterLink to="/user"> -->
        <div class="user-icon">
          <div class="subtitle-1">{{name}}</div>
        </div>

      <!-- </RouterLink> -->

        <div class="userSetting">
          <sl-dropdown placement="top-end">
            <span slot="trigger" class="material-symbols-outlined">
              settings
            </span>
            <sl-menu>

              <sl-menu-item @click="signOut(auth)" class="sign-out"> Sign out </sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';

import app from '../FirebaseInit'

import {onMounted, ref, watch} from "vue";
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(app)

const name = ref('')

onMounted(() => {
  //currently works but only after log in not after registering
  onAuthStateChanged(auth, (user: any) => {
    name.value = user != null ? user.displayName : "user not logged in"
  })

  //dont know why doesn't work
  if(auth.currentUser && auth.currentUser.displayName){
    name.value = auth.currentUser.displayName
  }
})

</script>

<style scoped>
.Navigation {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 0.5fr 2fr 0.5fr;
  grid-template-areas: "heading " "nav" "user";
  padding-inline: 20px;
}


@media screen and (max-width: 960px) {
  .Navigation {
    padding: 0;
    grid-template-rows: 2.5fr 0.5fr;
    grid-template-areas: "nav" "user";

  }
  header {
    display: none;
  }
}

.user {
  grid-area: user;
  display: flex;
  align-items: end;
  height: 100%;
  justify-content: space-between;
}

header {
  grid-area: heading;
}

header {
  font-size: 34px;
  font-weight: 600;
  line-height: 61px;
  letter-spacing: 0em;
  text-align: left;
  color: var(--Color-Primary-500);
  margin: 0;

}

.user .material-icons-outlined {
  color: black;
}
.user-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.userSetting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  grid-area: nav;
}

.navItem {
  display: flex;
  gap: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  padding-left: 20px;
  color: black;
  align-items: center;

}

.navItem:after {
  content: "";
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  border-radius: 16px;
  background-color: var(--Color-Primary-500);
  opacity: 13%;
  transition: height 0.2s, width 0.2s;
  width: 0;
  height: 0;
}

.router-link-active .navItem:after {
  width: 100%;
  height: 100%;
}

sl-menu-item::part(base) {
  color: var(--Color-Danger-500);
}
sl-dropdown::part(base) {
  cursor: pointer;
}



</style>