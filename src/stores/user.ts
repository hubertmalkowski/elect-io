import type { User } from "@/types/user";
import {defineStore} from "pinia";
import {ref} from "vue";

//Sex dsjfkjhgdajksfbhkjadhvjhsdvjkhasdvkbjadbj`fv
//ndsjafkhdvlfdshvdfjksafshfdwkahsf
//dklfsjhkaskfsfhdkasfshfdwjkhafsf
//askndjfshjdskasfdd


export const useUser = defineStore("user",() => {
    const user = ref<User | null>(null)


    return {
        user
    }
})