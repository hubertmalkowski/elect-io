<template>
  <div class="Navigation">
    <sl-input placeholder="Szukaj" v-model="filter.filterPhrase">
    <span class="material-symbols-outlined"
          slot="suffix">
      search
    </span>
    </sl-input>
    <div class="history"></div>


  </div>



</template>

<script lang="ts" setup>

import {useFilter} from "@/stores/filter";

const filter = useFilter()



</script>

<style scoped>
.Navigation {
  display: flex;
  flex-direction: column;
  padding: 14px;
}

</style>