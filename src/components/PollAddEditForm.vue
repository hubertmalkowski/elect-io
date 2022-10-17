<template>

  <section class="fields">
    <sl-input label="Nazwa"></sl-input>
    <sl-textarea label="Opis" resize="none"></sl-textarea>
    <input type="file">
  </section>
  <section>
    <sl-button variant="primary" @click="add" pill>Add</sl-button>
    <DraggableOptionEdit :options="options" @change="test"/>
  </section>
</template>

<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/textarea/textarea';
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import {ref, toRaw} from "vue";
import type {Option} from "@/types/option";


const options = ref<Array<Option>>([
  {
    name: "sexop",
    id: "123042"
  },
  {
    name: "bimbam",
    id: "123"
  },
  {
    name: "ser",
    id: "12334"
  }

])

function test( optionsChanged : any) {
  options.value = optionsChanged
  console.log(options.value )
}

function add() {
  options.value.push(
      {
        name: "",
        id: ""
      }
  )
}
</script>

<style scoped>

.fields {
  display: flex;
  flex-direction: column;

}

</style>