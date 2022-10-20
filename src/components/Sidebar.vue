<template>
  <div class="Navigation">
    <sl-input placeholder="Szukaj" v-model="filter.filterPhrase">
    <span class="material-symbols-outlined"
          slot="suffix">
      search
    </span>
    </sl-input>
    <div class="history"></div>

    <!-- it's only temporary, shall be replaced with nice stuff -->
    <span class="tempSpan" v-for="poll in polls">{{poll.name}} stworzona przez {{poll.creator}}</span>
  </div>



</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import {useFilter} from "@/stores/filter";
import type { Poll } from "@/types/poll"
import { getPollHistory } from "@/queries/getPollHistory";
import { getAllPollsFromHistory } from "@/queries/getAllPollsFromHistory";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../FirebaseInit"
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "@firebase/firestore";

const auth = getAuth(app)

const filter = useFilter()

const polls = ref<Array<{
  name: string,
  id: string,
  creator: string
}>>([])

onMounted(() => {  
  onAuthStateChanged(auth, async () => {

    const db = getFirestore(app)
    const auth = getAuth(app)
    const pollsRef = collection(db, "polls")
    const q = query(pollsRef, where("history", "array-contains", auth.currentUser?.uid), orderBy("date", "desc"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempPolls: Array<{
      name: string,
      id: string,
      creator: string
      }> = []

      querySnapshot.forEach((doc) => {
        let data = doc.data()
        let tempPoll: {
          name: string,
          id: string,
          creator: string
        } = {
          id: doc.id,
          name: data.name,
          creator: data.creator,
        }

        tempPolls.push(tempPoll) 
      })

      polls.value = tempPolls
    })

    

  return polls;
  })
})
</script>

<style scoped>
.Navigation {
  display: flex;
  flex-direction: column;
  padding: 14px;
}

.tempSpan {
  font-size: smaller;
}

</style>