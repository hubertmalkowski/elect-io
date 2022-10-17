<template>

  <section class="fields">
    <h2>Nowy sondaż</h2>
    <sl-input label="Nazwa"></sl-input>
    <sl-textarea label="Opis" resize="none"></sl-textarea>
    <input type="file">
  </section>
  <section>
    <div class="button">
      <h3>Opcje</h3>
      <sl-button variant="primary" @click="add" pill>Add</sl-button>
    </div>
    <DraggableOptionEdit :options="options" @change="test"/>
  </section>
</template>

<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/textarea/textarea';
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import {ref, toRaw} from "vue";
import type {Option} from "@/types/option";




const props = defineProps({
  poll: {
    type: Object,
    default: {
      name: "",
      image: "",
      description: "",
    }
  },
  options: {
    type: Array,
    default: [
      {
        name: "",
        id: "12"
      }
    ]

  }
})




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



function test(optionsChanged : any) {
  options.value = optionsChanged
  console.log(options.value)
}

function add() {
  options.value.unshift(
      {
        name: "",
        id: Math.random().toString()
      }
  )
}
</script>

<style scoped>

.fields {
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-bottom: 26px;
}

h2 {
  margin: 0;
}

.button {
  display: flex;
  justify-content: space-between;
}

</style>