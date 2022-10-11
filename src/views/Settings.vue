<script lang="ts" setup>
import '@shoelace-style/shoelace/dist/components/button/button.js';
import app from '../FirebaseInit'
import { signOut, getAuth } from 'firebase/auth'
const auth = getAuth(app)
</script>

<template>
    <sl-button @click="signOut(auth)" variant="danger" outline>Sign out</sl-button>    
</template>

<style scoped>
    sl-button{
        margin: 16px;
    }
</style>