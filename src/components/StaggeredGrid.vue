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

let keepChildren : Array<ChildNode>


onUpdated(() => {
  if (props.stagger) {

    enableStagger()

  }
  else {
    if (keepChildren) {
      disableStagger()
    }
  }

})

function enableStagger() {
  const children = grid.value!.childNodes

  const columnItems = new Array<Node>()


  const div = document.createElement('div')
  div.classList.add("column")

  const divSecond = document.createElement('div')
  divSecond.classList.add("column")


  keepChildren = Array.from(children)

  Array.from(children).forEach(
      (child, index) => {
        if (index % 2 == 0) {
          div.append(child)
        }
        else  {
          divSecond.append(child)
        }
      }
  )
  grid.value!.append(div)
  grid.value!.append(divSecond)
}


function disableStagger() {
  while (grid.value!.firstChild) {
    grid.value!.removeChild(grid.value!.firstChild);
  }
}





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

sl-spinner {
  --indicator-color: var(--Color-Primary-500);
}




</style>