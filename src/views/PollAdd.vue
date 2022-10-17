<script setup lang="ts">
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import {ref} from "vue";

function f(test : any) {
  console.log(test.options)
  console.log(test.poll)
}

const samplePoll = ref({
  name: "testowy formularz przekazany przez form",
  description: "deskrypcja tego forma",
  image: "img"
})

</script>

<template>

 <div>

<!--   Ogólnie to jak będziesz brał options to dostaniesz array obiektów złożonych z
        - name
        - id
        do zapytania do bazy bierz tylko name; id jest po to by działał dobrze draggable
-->
   <PollAddEditForm :poll="samplePoll" @submit="f"></PollAddEditForm>

 </div>

</template>



<style scoped>

</style>