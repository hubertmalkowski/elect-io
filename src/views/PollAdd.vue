<script setup lang="ts">
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import {ref} from "vue";



</script>

<template>

 <div>

<!--   Ogólnie to jak będziesz brał options to dostaniesz array obiektów złożonych z
        - name
        - id
        do zapytania do bazy bierz tylko name, id jest po to by działał dobrze draggable
-->
   <PollAddEditForm></PollAddEditForm>

 </div>

</template>



<style scoped>

</style>