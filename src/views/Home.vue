<template>
  <div class="stuff">
    <Card
        heading="Wybory na miss zsmeie"
        creator-name="ZSMEIE TORUŃ"
        :description="loremIpsum"
        action-label="głosuj teraz"
        @action="stuff"
        :img="image"
    />
  </div>

</template>

<script setup lang="ts">

import Card from "@/components/Card.vue";




const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"


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

</style>