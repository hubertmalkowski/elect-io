<template>
  <section class="Navigation">

    <nav>
      <router-link to="/" class="link">
        <div class="navItem">
          <span class="material-symbols-outlined">
            dashboard
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
              <sl-menu-item > <router-link to="/settings">Settings</router-link> </sl-menu-item>
              <sl-divider></sl-divider>
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

import app from '../FirebaseInit'


import { signOut, getAuth } from 'firebase/auth'
const auth = getAuth(app)


import {ref} from "vue";

const name = ref("Hubert Małkowski")

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


@media screen and (max-width: 1023px) {
  .Navigation {
    padding: 0;
    grid-template-rows: 2.5fr 0.5fr;
    grid-template-areas: "nav" "user";

  }
}

.user {
  grid-area: user;
  display: flex;
  align-items: end;
  height: 100%;
  justify-content: space-between;
}

.user .material-icons-outlined {
  color: black;
}
.user-icon {
  display: flex;
  align-items: center;
  gap: 10px;
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