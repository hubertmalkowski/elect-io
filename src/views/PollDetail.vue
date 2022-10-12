<script lang="ts" setup>
    import { onMounted, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import { getPollDetail } from "@/queries/getPollDetail";

    import app from "../FirebaseInit";
    import { getAuth } from "firebase/auth";

    const route = useRoute()
    const auth = getAuth()

    const heading = ref('')
    const creatorName = ref<string>('')
    const description = ref<string>('')

    const isPriviliged = ref<boolean>(false)

    onMounted(async () => {
        //@ts-ignore
        let pollID: string = route.params.id
        getPollDetail(pollID).then((poll) => {
        if (poll!=null) {
            heading.value = poll.name
            creatorName.value = poll.creator
            description.value = poll.description

            const currentUser = auth.currentUser!.uid
            if (poll.creatorUID == currentUser){
                // @TODO
                // add "edit" button if it's a poll owned by that user
                isPriviliged.value = true
            }
        }
    })
    })
    
</script>

<template>
    <div class="detail">
        <img src="https://wio.waw.pl/static/files/gallery/8/1107884_1606493893.jpg" alt="test">
        
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
            <sl-button variant="primary" outline size="large" pill v-if="isPriviliged">Edytuj</sl-button>
            <sl-button variant="primary" size="large" pill>Głosuj</sl-button>
        </div>
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

</style>