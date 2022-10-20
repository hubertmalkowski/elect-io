<template>

    <div class="polls" ref="polls">
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
  
    </div>
  
  </template>
  
  <script setup lang="ts">
  
  import Card from "@/components/Card.vue";
  import {onMounted, ref, watch, onActivated} from "vue";
  import { useRouter } from "vue-router";
  
  import type { Poll } from "@/types/poll";
  import { getAllPolls } from "@/queries/getAllPolls"
  import StaggeredGrid from "@/components/StaggeredGrid.vue";
import { getAllPollsFromHistory } from "@/queries/getAllPollsFromHistory";
  
  const router = useRouter()
  
  const testPolls = ref<Array<Poll>>([])
  const stagger = ref(false)
  
  onMounted(async () => {
    //retrieve data
    getAllPollsFromHistory().then((polls) => {
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
  }
  
  /*.polls {*/
  /*  max-width: 750px;*/
  /*}*/
  
  
  
  </style>