<template>
<form @submit.prevent="submit">
  <section class="fields">
    <div class="button" >
      <h2>Nowy sondaż</h2>
      <sl-button variant="primary" type="submit" size="large">Zapisz</sl-button>
    </div>
    <sl-input label="Nazwa"
              :value="poll.name"
              @sl-input="poll.name = $event.target.value"></sl-input>

    <sl-textarea label="Opis"
                 resize="none"
                 :value="poll.description"
                 @sl-input="poll.description = $event.target.value"
    ></sl-textarea>
    <input type="file"
           accept="image/gif, image/png, image/jpg"
           :value="imager"
           @input="imager = $event.target.value"
    >
  </section>
  <section>
    <div class="button">
      <h3>Opcje</h3>
      <sl-button variant="default" @click="add" pill>Add</sl-button>
    </div>
    <DraggableOptionEdit :options="options" @change="test"/>
  </section>
</form>

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
  },
  image: {
    type: String,
    default: ""
  }

})


const options = ref<Array<Option>>()

const poll = ref<Object>()

const imager = ref<String>()


//@ts-ignore
options.value = props.options
poll.value = props.poll
imager.value = props.image

function test(optionsChanged : any) {
  options.value = optionsChanged
}
function add() {
  options.value!.unshift(
      {
        name: "",
        id: Math.random().toString()
      }
  )
}
const emit = defineEmits([
    'submit'
])
function submit() {
  console.log("sex")
  emit('submit', {options: options.value, poll: poll.value, image: imager.value})
}
</script>

<style scoped>

.fields {
  display: flex;
  flex-direction: column;
  gap: 26px;
  /*margin-bottom: 16px;*/
}

h2 {
  margin: 0;
}

.button {
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
}

</style>