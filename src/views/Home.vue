<template>
  <div class="polls" ref="polls">

    <StaggeredGrid>
      <div class="" v-for="i in 10">
        <Card
            heading="Wybory na miss zsmeie"
            creator-name="ZSMEIE TORUŃ"
            :description="loremIpsum"
            action-label="głosuj teraz"
            @action="stuff"
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
import StaggeredGrid from "@/components/StaggeredGrid.vue";

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"


const polls = ref<HTMLElement | null>(null)

const image = "https://wio.waw.pl/static/files/gallery/8/1107884_1606493893.jpg"


function stuff() {
  console.log("kik")
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