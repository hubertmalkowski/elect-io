<template>
  <div class="polls" :class="{'full-height' : !stagger}">
    <StaggeredGrid :stagger="stagger" >
      <div class="" v-for="poll in testPolls">
        <Card
            :heading="poll.name"
            :creator-name="poll.creator"
            :description="poll.description"
            :img="poll.image"
            action-label="chevron_right"
            class="item"
            @action="router.push('/poll-detail/'+poll.pollID)"
        />
      </div>
    </StaggeredGrid>

    <h2 class="no-polls" v-if="testPolls.length === 0 && stagger">Nie stworzyłeś jeszcze sondaży, zrób to <router-link to="/poll-add">tutaj</router-link> :(</h2>

  </div>
</template>

<script setup lang="ts">
  import Card from "@/components/Card.vue";
  import {onMounted, ref, watch} from "vue";
  import { useRouter} from "vue-router"

  import type { Poll } from "@/types/poll";
  import { getUserPolls } from "@/queries/getUserPolls"
  import StaggeredGrid from "@/components/StaggeredGrid.vue";

  import app from "../FirebaseInit";
  import { getAuth } from "firebase/auth";

  const auth = getAuth(app)
  const router = useRouter()

  const testPolls = ref<Array<Poll>>([])
  const stagger = ref(false)

  onMounted(async () => {
    //retrieve data
    const userUID: string | undefined = auth.currentUser?.uid;

    if (userUID != undefined){
      getUserPolls(userUID).then((polls) => {
      testPolls.value = polls
    })
    }
  })

  watch(testPolls, (oldTestPolls, newTestPolls) => {
    stagger.value = newTestPolls !== [];
  })


  const image = "https://wio.waw.pl/static/files/gallery/8/1107884_1606493893.jpg"



</script>

<style scoped>
.polls {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.full-height {
  height: 100vh;
}
</style>