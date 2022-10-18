import {defineStore} from "pinia";
import {ref} from "vue";
import type {userAction} from "@/types/userActionType";



export const useUserActionStatus = defineStore('userActionStatus', () => {
    const status = ref<userAction>("browsing")

    function setStatus(tempStatus : userAction) {
        status.value = tempStatus
        setTimeout(() => {
            status.value = "browsing"
        }, 5000)
    }

    return {
        setStatus,
        status
    }
})