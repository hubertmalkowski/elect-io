<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { getPollDetail } from "@/queries/getPollDetail";

    import app from "../FirebaseInit";
    import { getAuth } from "firebase/auth";
    import { getPollHistory } from "@/queries/getPollHistory";
    import { getOptionsValuesFromPoll } from "@/queries/getOptionsValuesFromPoll";
    import { changePolStatus } from "@/queries/changePollStatus";
    import {Chart, registerables} from "chart.js";
    Chart.register(...registerables)
    const route = useRoute()
    const router = useRouter()
    const auth = getAuth()

    const heading = ref('')
    const creatorName = ref<string>('')
    const description = ref<string>('')
    const imageLink = ref<string>('')

    const votes = ref<Array<{name: string, value: number}>>([])

    const isPriviliged = ref<boolean>(false)
    const canVote = ref<boolean>(false)
    const isActive = ref<boolean>(false)
        //@ts-ignore
    const pollID: string = route.params.id
    onMounted(async () => {
        getPollDetail(pollID).then((poll) => {
            if (poll!=null) {
                heading.value = poll.name
                creatorName.value = poll.creator
                description.value = poll.description
                isActive.value = poll.active

                if (poll.image != "") {
                    imageLink.value = poll.image
                }

                const currentUser = auth.currentUser!.uid
                if (poll.creatorUID == currentUser){
                    isPriviliged.value = true
                }
                if (isPriviliged.value){
                    getOptionsValuesFromPoll(pollID).then((options) => {
                        options.forEach((option) => {
                            votes.value.push(option)
                        })
                      console.log("bdfskja")
                      setupChart()
                    })
                }

                getPollHistory(pollID).then((history) => {
                    canVote.value = !history.includes(currentUser);
                })
            }
        })

    })

    function deactivate() {
        changePolStatus(false, pollID)
        router.push("/my-polls")
    }

    function activate() {
        changePolStatus(true, pollID)
        router.push("/my-polls")
    }

    const chart = ref<HTMLCanvasElement | null>(null)

    function setupChart() {

      const voteNames = votes.value.map(element => element.name)
      const voteValues = votes.value.map(element => element.value)

      console.log(voteNames)
      //@ts-ignore
      const myChart = new Chart(chart.value, {
        type: "bar",
        data: {
          labels: voteNames,
          datasets: [{
            label: '# of Votes',
            data: voteValues,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',

            ],
            borderWidth: 1
          }]
        },
      })
    }
</script>

<template>
  <div class="wrapper">

    <div class="detail">
      <img :src="imageLink">

      <div class="headingWrapper" v-if="heading != ''">
        <span>{{heading}}</span>
        <span class="creator"><router-link to="/">
                {{creatorName}}
            </router-link></span>
      </div>
      <div class="descriptionWrapper" >
            <span class="body-medium" v-if="description != ''">
                {{description}}
            </span>
        <span class="body-medium" v-else>
                No description.
            </span>
      </div>
      <div class="button">
        <sl-button @click="deactivate" variant="danger" outline size="large" pill v-if="isPriviliged && isActive">
          <span slot="prefix" class="material-symbols-outlined">toggle_off</span>Deactivate
        </sl-button>
        <sl-button @click="activate" variant="primary" outline size="large" pill v-else-if="isPriviliged && !isActive">
          <span slot="prefix" class="material-symbols-outlined">toggle_on</span>Activate
        </sl-button>
        <sl-button variant="primary" @click="router.push(`/poll-edit/${pollID}`)" outline size="large" pill v-if="isPriviliged">Edytuj</sl-button>
        <sl-button v-if="canVote" variant="primary" @click="router.push('/poll-vote/' + pollID)" size="large" pill>Głosuj</sl-button>
        <sl-button v-else variant="primary" disabled size="large" pill>Głosuj</sl-button>
      </div>
      <div class="chart" v-if="isPriviliged">
        <canvas ref="chart">

        </canvas>


      </div>
    </div>

  </div>
</template>

<style scoped>
    .votes{
        display: flex;
        flex-direction: column;
    }

    .wrapper {
      height: 100%;    }
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

    .descriptionWrapper {
        margin-top: 40px;
        margin-bottom: 43px;
        color: var(--gray-1);
    }

    img {
        width: 100%;
        max-height: 15rem;
        object-fit: cover;
        border-radius: 40px;
        margin-left: auto;
        margin-right: auto;

        /* margin-left: auto;
        margin-right: auto;
        width: auto;
        max-height: 20%;
        border-radius: 40px;
        object-fit: cover; */
    }

    .button {
        display: flex;
        width: 100%;
        gap: 10px;
        justify-content:  flex-end;
    }
    .chart {
      width: 100%;
    }

</style>