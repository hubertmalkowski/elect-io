import {defineStore} from "pinia";
import {ref} from "vue";


export const useUser = defineStore("user",() => {
    const user = ref(null)


    return {
        user
    }
})