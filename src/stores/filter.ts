import {defineStore} from "pinia";
import {ref} from "vue";


export const useFilter = defineStore('filter', () => {
    const filterPhrase = ref<string>("")

    return {
        filterPhrase
    }
})