<template>

  <draggable v-model="arra" tag="transition-group" >
    <template #item="{element}">
      <OptionInput v-model="test"></OptionInput>

    </template>

  </draggable>

</template>

<script setup lang="ts">
import draggable from 'vuedraggable'


import {ref} from "vue";
import OptionInput from "@/components/OptionInput.vue";

const arra = ref([
    "test",
    "test2",
    "test3  "
])

const test = ref("")


</script>

<style scoped>

</style>