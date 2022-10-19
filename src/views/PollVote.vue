<script lang="ts" setup>
    import { onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { getPollDetail } from "@/queries/getPollDetail";
    import { getOptionsFromPoll } from "@/queries/getOptionsFromPoll";
    import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

    import app from "../FirebaseInit";
    import { getAuth } from "firebase/auth";
    import RadioVoting from "../components/RadioVoting.vue";

    import type { Option } from "@/types/option"
    import { addValueToOption } from "@/queries/addValueToOption";
    import CheckboxVoting from "../components/CheckboxVoting.vue";
    import {SlDialog} from "@shoelace-style/shoelace";
    import {useUserActionStatus} from "@/stores/status";
    
    const options = ref<Array<Option>>([])

    const route = useRoute()
    const router = useRouter()

    const heading = ref('')
    const creatorName = ref<string>('')
    const description = ref<string>('')
    
    const pollType = ref<string>('')

    //@ts-ignore
    const pollID: string = route.params.id
    onMounted(async () => {
        getPollDetail(pollID).then((poll) => {
        if (poll!=null) {
            heading.value = poll.name
            creatorName.value = poll.creator
            description.value = poll.description
            pollType.value = poll.type
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
    let selectedPollsIDs: Array<string> = []


    const dialog = ref<SlDialog | null>(null)
    onMounted(() => {
        test.value!.onsubmit = (event) => {
          event.preventDefault()
          dialog.value!.show()
        }
    })

    function updatePollsIDs(value: string) {
        //remove if contained inside selected polls
        if (selectedPollsIDs.includes(value)) {
            const valueIndex = selectedPollsIDs.indexOf(value)
            if (valueIndex >= 0) {
                selectedPollsIDs.splice(valueIndex, 1)                
            }
        } else { //add otherwise
            selectedPollsIDs.push(value)
        }

        //test log
        // console.log(selectedPollsIDs);
        
    }

    
    function voteChanged(value: string) {
        selectedPollID = value
    }

    function submit() {
      if(selectedPollID.length > 1 && selectedPollsIDs.length < 1) {
        addValueToOption(selectedPollID, pollID, 1)
      } else if(selectedPollID.length < 1 && selectedPollsIDs.length > 0) {
        selectedPollsIDs.forEach((pollTemp) => {
          console.log(pollTemp);

          addValueToOption(pollTemp, pollID, 1)
        })
      }
      router.push("/")
      useUserActionStatus().setStatus("voted")
    }
    function hideDialpog() {
      dialog.value!.hide()
    }

</script>

<template>



  <div class="detail">
    <sl-dialog label="Dialog" ref="dialog" class="dialog-overview">
      Czy na pewno chcesz zagłosować na tą opcję?
      <sl-button slot="footer" variant="primary" @click.prevent="submit()">Kontynuuj</sl-button>
      <sl-button slot="footer" variant="default" @click="hideDialpog()">Cofnij</sl-button>

    </sl-dialog>
        <div class="headingWrapper" v-if="heading != ''">
                <span>{{heading}}</span>
                <span class="creator"><router-link to="/">
                    {{creatorName}}
                </router-link></span>
        </div>
        <form ref="test">
            <RadioVoting v-if="pollType == 'radio' && options.length > 0"
                @vote-change="voteChanged"
                :poll = "route.params.id"
                :options = "options"
            />
            <CheckboxVoting v-else-if="pollType == 'checkbox' && options.length > 0"
                @vote-change="updatePollsIDs"
                :poll = "route.params.id"
                :options = "options"
            />
            <span v-else>Wrong poll type!</span>
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

    sl-button[variant='default'] {
      margin-right: 10px;
    }
</style>