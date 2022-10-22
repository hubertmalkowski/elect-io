<script lang="ts" setup>
    import '@shoelace-style/shoelace/dist/components/radio/radio.js';
    import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
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
    <sl-radio-group @sl-change="callback">
        <sl-radio :value="i.id"  v-for="i in options">{{i.name}}</sl-radio>
    </sl-radio-group>
</template>

<style scoped>
    sl-radio-group {
        border: none;
        font-size: 2rem;
    }

    sl-radio::part(base) {
      display: flex;
      align-items: center;
      margin: 1rem 0;

    }

    sl-radio::part(control) {
    --sl-color-primary-600: var(--Color-Primary-500);
    --sl-color-primary-500: var(--Color-Primary-400);
      --sl-toggle-size: 1.3rem;
    }

    sl-radio::part(label) {
      font-size: 1.3rem;
    }
</style>