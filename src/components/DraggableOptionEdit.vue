<template>

  <draggable v-model="options"  item-key="id" :move="change()">
    <template #item="{element}">
      <div class="flex">
      <span class="material-symbols-outlined drag">
        drag_indicator
      </span>
          <sl-input placeholder="Option Name"
                    :value="element.name"
                    @sl-input="(event : any) => {element.name = event.target.value; change()}"
          ></sl-input>
          <span class="material-symbols-outlined delete" @click="deleteElement(element.id)">
        remove_circle
      </span>
        </div>
    </template>
  </draggable>

</template>

<script setup lang="ts">
import draggable from 'vuedraggable'


import {ref, watch} from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: [
      {
        name: ref(""),
        id: ""
      }
    ]
  }
})

const emit = defineEmits(['change'])

function deleteElement(id : string) {
  //@ts-ignore
  props.options?.splice(props.options?.findIndex(element => element.id == id), 1)
  emit('change', props.options)
}

function change() {
  emit('change', props.options)
}


</script>

<style scoped>

.flex {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
}
.flex span:not(.drag) {
  cursor: pointer;
  user-select: none;
}

.drag {
  cursor: grab;
  user-select: none;

}



.flex .delete {
  color: var(--Color-Danger-600);
}

sl-input {
  width: 100%;
}


</style>