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
    <sl-radio-group fieldset @sl-change="callback">
        <sl-radio :value="i.id"  v-for="i in options">{{i.name}}</sl-radio>
    </sl-radio-group>
</template>

<style scoped>
    sl-radio-group {
        border: none;
    }

    sl-radio::part(control) {
    --sl-color-primary-600: var(--Color-Primary-500);
    }
</style>