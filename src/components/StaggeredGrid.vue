<template>
  <section ref="grid" class="staggered-grid">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const grid = ref<HTMLElement | null>(null)

onMounted(() => {

  const children = grid.value!.childNodes

    const columnItems = new Array<Node>()


    const div = document.createElement('div')
    div.classList.add("column")

    const divSecond = document.createElement('div')
    divSecond.classList.add("column")

    console.log(children)

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
})

</script>

<style scoped>

.column {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-inline: 20px ;

}


.staggered-grid {
  display: flex;
  justify-content: space-between;
}


</style>