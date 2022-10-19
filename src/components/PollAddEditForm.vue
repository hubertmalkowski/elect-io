<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/textarea/textarea';
import '@shoelace-style/shoelace/dist/components/select/select';
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import {ref, toRaw} from "vue";
import type {Option} from "@/types/option";




const props = defineProps({
  poll: {
    type: Object,
    default: {
      name: "",
      description: "",
      type: ""
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
  },
  heading: {
    type: String,
    default: "New Poll"
  },
  isLoading: {
    type: Boolean,
    default: false
  }

})


const options = ref<Array<Option>>()

const poll = ref<Object>()

const imager = ref<String>()


const fileInput = ref<HTMLInputElement | null>(null)


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
  emit('submit', {options: options.value, poll: poll.value, image: (fileInput.value!.files!.length > 0) ? fileInput.value!.files![0] : null})
}
</script>


<template>
<form @submit.prevent="submit">
  <section class="fields">
    <div class="button" >
      <h2>{{heading}}</h2>
      <sl-button variant="primary" type="submit" size="large" :loading="isLoading">Zapisz</sl-button>
    </div>
    <sl-input label="Nazwa"
              :value="poll.name"
              @sl-input="poll.name = $event.target.value"></sl-input>

    <sl-select label="Typ"
               :value="poll.type"
               @sl-change="poll.type = $event.target.value"
     >
      <sl-menu-item value="radio">Pojedyńczy wybór</sl-menu-item>
      <sl-menu-item value="checkbox">Wielokrotny wybór</sl-menu-item>


    </sl-select>

    <sl-textarea label="Opis"
                 resize="none"
                 :value="poll.description"
                 @sl-input="poll.description = $event.target.value"
    ></sl-textarea>
    <input type="file"
           accept="image/gif, image/png, image/jpg, image/jpeg"
           :value="imager"
           @input="imager = $event.target.value"
           ref="fileInput"
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

form {
  height: 100vh;
  overflow-y: scroll;
  padding-inline: 14px;
}

</style>