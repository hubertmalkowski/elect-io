<template>

  <draggable v-model="arra">
    <template #item="{element}">
      <div>{{element}}</div>

    </template>

  </draggable>

</template>

<script setup lang="ts">
import draggable from 'vuedraggable'


import {ref} from "vue";

const arra = ref([
    "test",
    "test2",
    "test3"
])


</script>

<style scoped>

</style>