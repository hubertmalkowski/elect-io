<template>
  <section ref="grid" class="container" :class="{loader : !stagger, 'staggered-grid' : stagger}">
    <slot v-if="stagger"></slot>
    <sl-spinner v-else style="font-size: 4rem"></sl-spinner>
  </section>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUpdated, ref} from "vue";
import {useMobileBreakpoint} from "@/compsables/useMobileBreakpoint";

const grid = ref<HTMLElement | null>(null)

const props = defineProps( {
  stagger: {
    type: Boolean!,
    default: false
  }
})

const inStagger = ref(false)

let keepChildren : Array<ChildNode>


onUpdated(() => {
  if (props.stagger && !inStagger.value && !useMobileBreakpoint(window)) {

    enableStagger()


    inStagger.value = true

  }
  else {
    if (keepChildren) {
      disableStagger()
      inStagger.value = false

    }
  }


})

onMounted(() => {
  window.addEventListener("resize", () => {
    if (!inStagger.value && !useMobileBreakpoint(window) && props.stagger) {
      enableStagger()
      inStagger.value = true

    }
    else if (inStagger.value && useMobileBreakpoint(window)) {
      disableStagger()
      inStagger.value = false

    }
  })
})



function enableStagger() {
  if (keepChildren == undefined) {
    const children = grid.value!.childNodes
    keepChildren = Array.from(children)
  }
  const columnItems = new Array<Node>()
  const divs = new Array<HTMLElement>()
  for (let i = 0; i < 2; i++) {
    divs.push(document.createElement('div'))
    divs[i].classList.add("column")
  }


  keepChildren.forEach(
      (child, index) => {
        if (index % 2 == 0) {
          divs[0].append(child)
        }
        else  {
          divs[1].append(child)
        }
      }
  )

  divs.forEach((column) => {
    grid.value!.append(column)
  })


}


function disableStagger() {
  while (grid.value!.firstChild) {
    grid.value!.removeChild(grid.value!.firstChild);

  }
  keepChildren.forEach((child) => {
    grid.value!.append(child)
  })
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
  justify-content: center;
  width: 100%;
  display: flex;
  height: 40vh;
  align-items: center;
}


.staggered-grid {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 960px) {
  .staggered-grid {
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
    padding-inline: 20px;
  }
}

sl-spinner {
  --indicator-color: var(--Color-Primary-500);
}

.container {
  height: 100%;
  padding-right: 4px;

}




</style>