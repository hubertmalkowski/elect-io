<script lang="ts" setup>
    import { onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { getPollDetail } from "@/queries/getPollDetail";
    import { getOptionsFromPoll } from "@/queries/getOptionsFromPoll";

    import app from "../FirebaseInit";
    import { getAuth } from "firebase/auth";
    import RadioVoting from "../components/RadioVoting.vue";

    import type { Option } from "@/types/option"
    import { addValueToOption } from "@/queries/addValueToOption";
    
    const options = ref<Array<Option>>([
        // {
        //     name: "Opcja A",
        //     id: "id1"
        // },
        // {
        //     name: "Opcja B",
        //     id: "id2"
        // },
        // {
        //     name: "Opcja C",
        //     id: "id3"
        // },
    ])

    const route = useRoute()
    const router = useRouter()

    const heading = ref('')
    const creatorName = ref<string>('')
    const description = ref<string>('')

    //@ts-ignore
    const pollID: string = route.params.id
    onMounted(async () => {
        getPollDetail(pollID).then((poll) => {
        if (poll!=null) {
            heading.value = poll.name
            creatorName.value = poll.creator
            description.value = poll.description
        }
        })

        getOptionsFromPoll(pollID).then((newOptions) => {
            if(options!=null) {
                options.value = newOptions
            }
        })
    })

    const test = ref<HTMLElement | null>(null)
    let selectedPollID: string = ""

    onMounted(() => {
        test.value!.onsubmit = (event) => {
            event.preventDefault()
            if(selectedPollID.length < 1) { return}
            addValueToOption(selectedPollID, pollID, 1)
            router.push("/")
            alert("odddano głos")
        }
    })

    
    function voteChanged(value: string) {
        selectedPollID = value
    }
</script>

<template>
    <div class="detail">
        <div class="headingWrapper" v-if="heading != ''">
                <span>{{heading}}</span>
                <span class="creator"><router-link to="/">
                    {{creatorName}}
                </router-link></span>
        </div>
        <form ref="test">
            <RadioVoting v-if="options.length > 0"
                @vote-change="voteChanged"
                :poll = "route.params.id"
                :options = "options"
            />
            <sl-button type="submit" variant="primary" size="large" pill>Zagłosuj</sl-button>
        </form>
    </div>
</template>

<style scoped>
    .detail {
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        height: fit-content;
        width: 100%;
    }
    .headingWrapper {
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 44px;
        display: flex;
        flex-direction: column;
    }

    .headingWrapper .creator {
        font-size: 24px;
        line-height: 32px;
    }

    sl-button {
        float: right;
    }
</style>