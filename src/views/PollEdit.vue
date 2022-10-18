

<script setup lang="ts">
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import { getOptionsFromPoll } from "@/queries/getOptionsFromPoll";
import { getPollDetail } from "@/queries/getPollDetail";
import type { Option } from "@/types/option";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
// @ts-ignore
const pollID: string = route.params.id 

const poll = ref<{
  name: string,
  description: string,
  type: string
}>({
  name: "placeholder",
  description: "placeholder",
  type: "radio"
})

const options = ref<Array<{
  name: string,
  id: string
}>>([])

onMounted(async () => {
  const newPoll = await getPollDetail(pollID)

  poll.value.name = newPoll!.name
  poll.value.description = newPoll!.description
  poll.value.type = newPoll!.type

  const tempOptions = await getOptionsFromPoll(pollID)
  tempOptions.forEach((option) => {
    console.log(option);
    
    options.value.push({
      name: option.name,
      id: Math.random().toString()
    })
  })
})

function submit(target : any) {
  console.log(target.poll)
  console.log(target.image)
  console.log(target.option)

}
</script>

<template>

  <PollAddEditForm :poll="poll" :options="options" @submit="submit"></PollAddEditForm>


</template>

<style scoped>

</style>