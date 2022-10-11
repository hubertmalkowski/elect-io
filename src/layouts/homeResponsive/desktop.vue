<template>
  <div class="layout">
    <div class="router">
      <slot></slot>
    </div>
    <div class="sidebar">
      <Sidebar></Sidebar>
    </div>
  </div>

</template>

<script lang="ts" setup>

import Sidebar from "@/components/Sidebar.vue";
</script>

<style scoped>

.layout {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 32px;
}
.router {
  grid-column-start: 3 ;
  grid-column-end: 7;
}

.sidebar {
  grid-column: 7 / 9;
}



</style>