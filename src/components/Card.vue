<script lang="ts" setup>
import '@shoelace-style/shoelace/dist/components/input/input.js';

const props = defineProps({
  img: {
    type: String,
    default: null
  },
  heading: {
    type: String,
    default: null
  },
  creatorName: {
    type: String,
    default: null
  },
  creatorId: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default:null
  },
  actionLabel: {
    type: String,
    default: null
  }

})


const emit = defineEmits([
    'action'
])

function action() {
  emit('action')
}

</script>


<template>

  <article class="card">
    <div v-if="img != null" class="imageWrapper">
      <img :src="img" alt="Image depicting ">
    </div>
    <div class="headingWrapper" v-if="heading != null">
      <span class="body-large">{{heading}}</span>
      <span class="body-medium"><router-link to="/">
        {{creatorName}}
      </router-link></span>
    </div>
    <div class="descriptionWrapper" v-if="description != null">
      <span class="body-medium">
        {{description}}
      </span>
    </div>
    <div class="actionsWrapper" v-if="actionLabel != null">
      <sl-button variant="primary" pill @click="action">{{actionLabel}}</sl-button>
    </div>

  </article>

</template>



<style scoped>

.card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: var(--Color-Primary-500) 1px solid;
  height: fit-content;
  width: 100%;
  min-width: 335px;
}

.headingWrapper {
  display: flex;
  flex-direction: column;
}

.descriptionWrapper {
  color: var(--gray-1);
}

.card > div {
  padding: 16px;
}

.actionsWrapper {
  display: flex;
  justify-content: right;
}

div img {
  width: 100%;
  object-fit: cover;
  /*border-radius: 12px 12px 0 0;*/
}
.imageWrapper {
  padding: 0 !important;
}

</style>