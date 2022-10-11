<template>
  <section ref="grid" class="staggered-grid" :class="{loader : !stagger}">
    <slot v-if="stagger"></slot>
    <sl-spinner v-else style="font-size: 4rem"></sl-spinner>
  </section>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUpdated, ref} from "vue";

const grid = ref<HTMLElement | null>(null)

const props = defineProps( {
  stagger: {
    type: Boolean,
    default: false
  }
})

onUpdated(() => {
  if (props.stagger) {
    const children = grid.value!.childNodes

    const columnItems = new Array<Node>()


    const div = document.createElement('div')
    div.classList.add("column")

    const divSecond = document.createElement('div')
    divSecond.classList.add("column")


    Array.from(children).forEach(
        (child, index) => {
          if (index % 2 == 0) {
            divSecond.append(child)
          }
          else  {
            div.append(child)
          }
        }
    )
    grid.value!.append(div)
    grid.value!.append(divSecond)
  }

})




</script>

<style scoped>

.column {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-inline: 20px ;
}
.loader {
  margin-top: 50%;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
}


.staggered-grid {
  width: 100%;
  display: flex;
  justify-content: space-between;
}




</style>