<template>
    <q-page padding class="panel-list">
        <div class="q-pa-sm cards">
            <q-intersection
                v-for="(group, idx) of groups"
                :key="idx"
                once
                transition="fade"
                class="card-wrapper"
            >
                <q-card flat bordered>
                    <q-card-section horizontal>
                        <q-card-section class="col-2 col-sm-3 q-pa-sm">
                            <q-img :src="`/img/panels/${group[0]}.gif`"/>
                        </q-card-section>
                        <q-card-section class="q-pl-none q-pr-sm q-py-sm full-width">
                            <div v-for="w of group[1]" :key="w.no">
                                <span>【{{ `000${w.no}`.slice(-3) }}】</span>
                                <span>{{ w.word }}</span>
                                <q-badge
                                    rounded
                                    align="middle"
                                    :style="{
                                        backgroundColor: badgeColor(w.yomi)
                                    }"
                                    class="justify-center"
                                >{{ w.yomi }}</q-badge>
                            </div>
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-intersection>
        </div>
    </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { WordManager } from '@/WordManager';

@Component
export default class Panels extends Vue {
    private wordManager = new WordManager();

    private get groups() {
        const map = new Map<string, Word[]>();
        for (const w of this.wordManager.Words) {
            const group = map.get(w.group);
            if (group) {
                group.push(w);
            }
            else {
                map.set(w.group, [w]);
            }
        }
        return map;
    }

    /**
     * ヨミ毎のバッジの色を返す
     */
    private badgeColor(yomi: Yomi) {
        if (yomi === 'フツウ') return '#73af55';
        else if (yomi === 'ウラ') return '#2ea9ff';
        else return '#ff7faa';
    }
}
</script>

<style lang="scss" scoped>
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, max-content));
    justify-content: center;
    column-gap: 10px;
    row-gap: 10px;
    > .card-wrapper {
        min-height: 75px;
        .q-card {
            background-color: #f4f1e7;
            > .q-card__section > .q-card__section:nth-child(2) > div {
                display: grid;
                grid-template-columns: min-content auto 50px;
                align-items: center;
                margin-bottom: 5px;
                padding-bottom: 1px;
                border-bottom: 3px dotted #d9ccb0;
                .q-badge {
                    width: 50px;
                    height: 18px;
                    font-family: 'M PLUS Rounded 1c', sans-serif;
                    font-size: 10px;
                    font-weight: bold;
                }
            }
        }
    }
}

body.screen--xs {
    .cards {
        grid-template-columns: repeat(auto-fit, minmax(100%, max-content));
        justify-content: center;
        > .card-wrapper {
            max-width: 100%;
        }
    }
}
</style>
