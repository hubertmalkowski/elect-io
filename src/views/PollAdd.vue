<script setup lang="ts">
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import {ref} from "vue";
import { useRouter } from "vue-router";

import app from "../FirebaseInit"
import { getAuth } from "firebase/auth";
// import { getStorage, uploadBytes, ref as ref2 } from "firebase/storage"

import { createNewPoll } from "@/queries/createNewPoll";
// import { setDoc } from "@firebase/firestore";

const auth = getAuth(app)
// const storage = getStorage(app)

const router = useRouter()

function f(test : any) {
  console.log(test.options)
  console.log(test.poll)
  console.log(test.image)

  let options: any[] = []

  test.options.forEach((option: { name: any; }) => {
    options.push(option.name)
  })
  // console.log(options);

  createNewPoll(
    test.poll.name,
    auth.currentUser!.displayName!,
    auth.currentUser!.uid,
    test.poll.description,
    test.poll.type,
    options
  )
  // an attempt at adding image
  // ).then((newPoll) => {
  //   let imageTemp
  //   if (test.image){
  //     const storageRef = ref2(storage, "files/${file.name}")
  //   uploadBytes(storageRef, test.image).then((snapshot) => {
  //     imageTemp = snapshot.metadata.name
  //   })
  //   setDoc(newPoll, {
  //     image: imageTemp
  //   })
  // }
  // })
  // sanity is low, I repeat - sanity is low...

  // comment when debugging
  alert("Dodano nowy sondaż!")
  router.push("/")
}

const samplePoll = ref({
  name: "testowy formularz przekazany przez form",
  description: "deskrypcja tego forma",
  type: "radio"
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