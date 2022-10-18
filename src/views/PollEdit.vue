

<script setup lang="ts">
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import { getOptionsFromPoll } from "@/queries/getOptionsFromPoll";
import { getPollDetail } from "@/queries/getPollDetail";
import { updatePollDetail } from "@/queries/updatePollDetail";
import router from "@/router";
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
})

async function submit(target : any) {
  console.log(target.poll)
  // console.log(target.image)
  console.log(target.options)
  const newOptions = target.options.map((element: { name: any; }) => element.name)
  console.log(newOptions);
  

  await updatePollDetail(target.poll.name, target.poll.description, target.poll.type, newOptions, target.image, pollID)
  router.push("/my-polls")

}
</script>

<template>

  <PollAddEditForm :poll="poll" :options="options" @submit="submit"></PollAddEditForm>


</template>

<style scoped>

</style>