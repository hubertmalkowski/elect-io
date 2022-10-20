<template>

  <div class="polls" ref="polls" :class="{'full-height' : !stagger}">
    <StaggeredGrid :stagger="stagger">
      <div class="" v-for="poll in testPolls">
        <Card
            :heading="poll.name"
            :creator-name="poll.creator"
            :description="poll.description"
            :img="poll.image"
            action-label="chevron_right"
            @action="router.push('/poll-detail/' + poll.pollID)"
            class="item"
        />
      </div>
    </StaggeredGrid>

    <h2 class="no-polls" v-if="testPolls.length === 0 && stagger">Niestety nie ma dostępnych sondaży do głosowania :(</h2>

  </div>

</template>

<script setup lang="ts">

import Card from "@/components/Card.vue";
import {onMounted, ref, watch} from "vue";
import { useRouter } from "vue-router";

import type { Poll } from "@/types/poll";
import { getAllPolls } from "@/queries/getAllPolls"
import StaggeredGrid from "@/components/StaggeredGrid.vue";

const router = useRouter()

const testPolls = ref<Array<Poll>>([])
const stagger = ref(false)

onMounted(async () => {
  //retrieve data
  getAllPolls().then((polls) => {
    testPolls.value = polls
  })
})

watch(testPolls, (oldTestPolls, newTestPolls) => {
  stagger.value = newTestPolls !== [];
})



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
  position: relative;
}

/*.polls {*/
/*  max-width: 750px;*/
/*}*/

.no-polls {
  color: var(--Color-Primary-500);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  width: 100%;
  margin:  30% auto ;
}

.full-height {
  height: 100vh;
}


</style>