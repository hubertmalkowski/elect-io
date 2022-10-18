

<script setup lang="ts">
import PollAddEditForm from "@/components/PollAddEditForm.vue";

const poll = {
  name: "placeholder",
  description: "placeholder",
  type: "radio"
}

const option = [
  {
    name: "adfsg",
    id: "12098"
  }
]


function submit(target : any) {
  console.log(target.poll)
  console.log(target.image)
  console.log(target.option)

}
</script>

<template>

  <PollAddEditForm :poll="poll" :options="option" @submit="submit"></PollAddEditForm>


</template>

<style scoped>

</style>