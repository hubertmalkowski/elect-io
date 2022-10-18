<script setup lang="ts">
import DraggableOptionEdit from "@/components/DraggableOptionEdit.vue";
import PollAddEditForm from "@/components/PollAddEditForm.vue";
import {ref} from "vue";
import { useRouter } from "vue-router";

import app from "../FirebaseInit"
import { getAuth } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref as fref } from "firebase/storage";

import { createNewPoll } from "@/queries/createNewPoll";
import {useUserActionStatus} from "@/stores/status";
import { setDoc, updateDoc } from "@firebase/firestore";

const auth = getAuth(app)
const storage = getStorage(app)

const router = useRouter()

const userActionStatus = useUserActionStatus()

function f(test : any) {
  console.log(test.options)
  console.log(test.poll)
  console.log(test.image)

  let options: any[] = []

  test.options.forEach((option: { name: any; }) => {
    options.push(option.name)
  })

  createNewPoll(
    test.poll.name,
    auth.currentUser!.displayName!,
    auth.currentUser!.uid,
    test.poll.description,
    test.poll.type,
    options
  ).then((newPoll) => {
    if(test.image){
      const storageRef = fref(storage, test.image.name)
      uploadBytes(storageRef, test.image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((value) => {
          updateDoc(newPoll, {
            image: value
          })
        })
      })
    }
  })

    // document.location.reload()
  router.push("/")
  userActionStatus.setStatus("addedPoll")
}



</script>

<template>

 <div>

   <PollAddEditForm    @submit="f"></PollAddEditForm>

 </div>

</template>



<style scoped>

</style>