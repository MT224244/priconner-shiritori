<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title>ドラちゃんのチートシート</q-toolbar-title>

                <div>v{{ version }}</div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { version } from '@/../package.json';

@Component({
    data: () => ({
        version
    })
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
    background-color: #ece6ce;
}
</style>
