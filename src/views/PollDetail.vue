<script lang="ts" setup>
    import { ref } from "vue";

    const heading = ref("Heading")
    const creatorName = ref<string>("creatorName")
    const description = ref<string>('')
</script>

<template>
    <div class="detail">
        <img src="https://wio.waw.pl/static/files/gallery/8/1107884_1606493893.jpg" alt="test">
        
        <div class="headingWrapper" v-if="heading != null">
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
    </div>
    <!-- @TODO -->
    <!-- i don't know whether float right is a good idea -->
    <sl-button variant="primary" style="float:right;" size="large" pill>Głosuj</sl-button>
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

    .headingWrapper.creator {
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
        height: 15rem;
        object-fit: cover;
        border-radius: 40px;
        
        /* margin-left: auto;
        margin-right: auto;
        width: auto;
        max-height: 20%;
        border-radius: 40px;
        object-fit: cover; */
    }

</style>