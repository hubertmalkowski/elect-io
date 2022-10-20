<template>
  <sl-drawer ref="drawer" label="Menu " @sl-hide="drawerOpen = !drawerOpen">
    <Navigation/>

  </sl-drawer>
  <div>
    <header>
      <div class="logo">Elect io</div>
      <div class="menu" @click="drawerOpen = !drawerOpen">
        <span class="material-symbols-outlined">menu</span>

      </div>

    </header>
    <div class="content">
      <slot></slot>
    </div>

  </div>



</template>

<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import {onMounted, ref, watch} from "vue";
import {SlDrawer} from "@shoelace-style/shoelace";
import Navigation from "@/components/Navigation.vue";

const drawer = ref<SlDrawer | null>(null)
const drawerOpen = ref(false)

watch(drawerOpen, (value) => {
  if (value) {
    drawer.value!.show()
  }
  else  {
    drawer.value!.hide()
  }
})




</script>

<style scoped>

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  background-color: var(--Background);
  justify-content: space-between;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  line-height: 58px;
  text-align: left;
  z-index: 200;
}
header .logo {
  width: fit-content;
  margin-left: 14px;
}

header span {
  font-size: 44px;
  cursor: pointer;
}
header .menu {
  display: flex;
  align-items: center;
  padding-right: 14px;
}

.content {
  margin-top: 10vh ;
}

sl-drawer::part(base) {
  overflow-x: hidden;
}
sl-drawer::part(body) {
  overflow-x: hidden;
}
sl-drawer::part(panel) {
  overflow: hidden;
  --size: 80%;
}


</style>