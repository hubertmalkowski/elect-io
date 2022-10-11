<template>

  <div class="polls" ref="polls">
    <StaggeredGrid>
      <div class="" v-for="poll in testPolls">
        <Card
            :heading="poll.name"
            :creator-name="poll.creator"
            :description="poll.description"
            action-label="głosuj teraz"
            class="item"
            :img="image"
        />
      </div>
    </StaggeredGrid>

  </div>

</template>

<script setup lang="ts">

import Card from "@/components/Card.vue";
import {onMounted, ref} from "vue";

import app from "../FirebaseInit";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import type { Poll } from "@/types/poll";
import StaggeredGrid from "@/components/StaggeredGrid.vue";

const db = getFirestore(app)

// const dataFetched = ref<boolean>(false)
//create Poll array
const testPolls = ref<Array<Poll>>([])

onMounted(async () => {
  //retrieve data
  const querySnapshot = await getDocs(collection(db, "polls"))
  let polls: Array<Poll> = []
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    let tempPoll: Poll = {
      name: data.name,
      creator: data.creator,
      description: data.description,
      options: data.options,
      expirationDate: data.expirationDate,
      type: data.type,
      active: data.active
    }

    console.log(tempPoll);
    
    // push Poll into Poll array
    polls.push(tempPoll)  
  })

testPolls.value = polls
// dataFetched.value = true
})





const polls = ref<HTMLElement | null>(null)

const image = "https://wio.waw.pl/static/files/gallery/8/1107884_1606493893.jpg"


function stuff(poll: any) {
  console.log(poll)
}


</script>

<style scoped>
.stuff {
  max-width: 400px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50px;
}

.item {
  /*width: 100%;*/
}

.flex-polls {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.polls {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

/*.polls {*/
/*  max-width: 750px;*/
/*}*/



</style>