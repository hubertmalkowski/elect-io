
<script setup lang="ts">

const props = defineProps({
  optionName : {
    default: "chelc",
    type: String
  }
})
const emit = defineEmits([
    'update:optionName',
    'delete'
])

function test() {
  console.log("happ")
}

</script>


<template>

  <div class="flex">
    <span class="material-symbols-outlined">
      drag_indicator
    </span>
    <sl-input placeholder="Option Name"
              :value="optionName"
              @sl-input="$emit('update:optionName', $event.target.value)"

    ></sl-input>
    <span class="material-symbols-outlined delete">
      remove_circle
    </span>
  </div>

</template>


<style scoped>
.flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
.flex span {
  cursor: pointer;
  user-select: none;
}

.flex .delete {
  color: var(--Color-Danger-600);
}

</style>