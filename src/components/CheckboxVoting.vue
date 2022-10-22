<script lang="ts" setup>
    import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
    import '@shoelace-style/shoelace/dist/components/button/button.js';
    import {withDefaults, defineProps, ref, onMounted} from "vue";
    import type { Option } from '@/types/option'

    interface Props {
        pollName?: string,
        options?: Array<Option>
    }

    const props = withDefaults(defineProps<Props>(), {
        pollName: "",
        options: undefined
    })

    const emit = defineEmits([
        'voteChange'
    ])

    function callback(event : any) {
        emit('voteChange', event.target.value)
    }

</script>

<template>
    <div class="checkboxes">
        <sl-checkbox @sl-change="callback" :value="i.id"  v-for="i in options">{{i.name}}</sl-checkbox>
    </div>
</template>

<style scoped>
    .checkboxes {
        display: flex;
        flex-direction: column;
    }

    sl-checkbox::part(control) {
      --sl-color-primary-600: var(--Color-Primary-500);
      --sl-color-primary-500: var(--Color-Primary-400);
      --sl-toggle-size: 1.3rem;
    }

    sl-checkbox::part(base) {
      display: flex;
      align-items: center;
      margin: 0.9rem 0;
    }



    sl-checkbox::part(label) {
      font-size: 1.3rem;
    }
</style>