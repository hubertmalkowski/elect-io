<template>
  <div class="Navigation">
    <sl-input placeholder="Szukaj" v-model="filter.filterPhrase">
    <span class="material-symbols-outlined"
          slot="suffix">
      search
    </span>
    </sl-input>

    <div class="history">
      <div class="historyHeader">
        <span class="body-small">Historia głosowania</span>
        <span class="material-symbols-outlined">history</span>
      </div>
      <div class="historyItems">
        <div class="historyItem" v-for="poll in polls">
          <span>{{poll.name}}</span>
          <span><router-link to="/">{{poll.creator}}</router-link></span>
        </div>
      </div>
    </div>

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
import { collection, getFirestore, onSnapshot, orderBy, query, where, limit } from "@firebase/firestore";

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
    const q = query(pollsRef, where("history", "array-contains", auth.currentUser?.uid), orderBy("date", "desc"), limit(6))

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

.history {
  margin-left: 20px;
  margin-right: 20px;
}
.historyHeader {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
}
.historyItem {
  display: flex;
  flex-direction: column;
  font-size: medium;
  margin-top: 32px;
  margin-bottom: 32px;
}
</style>