<template>
    <q-page padding class="home">
        <div>
            <div>｢プリンセスコネクト！Re:Dive｣のミニゲーム｢大激戦！しりとりドラゴンズ｣のチートシートです</div>
            <div>カードをクリックすると選んだワードに続くワードを検索します</div>
            <div class="q-mb-lg">
                <span>何かあれば</span>
                <a href="http://twitter.com/MT224244" target="_blank">@MT224244</a>
                <span>までご連絡ください</span>
            </div>
            <div>
                <div>並べ替え</div>
                <q-radio val="number" label="番号順" v-model="sortType"/>
                <q-radio val="syllabary" label="五十音順" v-model="sortType"/>
            </div>
            <div>
                <div>絞り込み</div>
                <div>
                    <q-checkbox label="初期ワード(～No.505)" v-model="isInitWords"/>
                    <q-checkbox label="2021年4月30日追加分(No.506～No.753)" v-model="isAdd20210430"/>
                </div>
                <div>
                    <q-checkbox label="フツウヨミ" v-model="isFutsuYomi"/>
                    <q-checkbox label="ウラヨミ" v-model="isUraYomi"/>
                    <q-checkbox label="プリコネヨミ" v-model="isPriconneYomi"/>
                </div>
            </div>
            <div>
                <div>検索モード</div>
                <q-radio val="fuzzy" label="あいまい" v-model="searchType"/>
                <q-radio val="prefix" label="前方一致" v-model="searchType"/>
                <q-radio val="suffix" label="後方一致" v-model="searchType"/>
                <q-checkbox label="長音符(ー)を含める" v-model="enableProlongedSoundMark"/>
            </div>
            <div>
                <q-input
                    filled
                    dense
                    clearable
                    label="検索"
                    label-color="grey-8"
                    class="q-mb-md"
                    v-model="searchText"
                    @clear="clearSearchText_onClick"
                />
            </div>
            <div v-if="words.length > 0" class="justify-center cards">
                <q-intersection
                    v-for="w of words"
                    :key="w.no"
                    transition="fade"
                >
                    <q-card
                        v-ripple
                        :style="{
                            backgroundColor: cardColor(w.yomi)
                        }"
                        class="cursor-pointer non-selectable q-pa-xs"
                        @click="card_onClick(w)"
                    >
                        <q-img height="72px" :src="`/img/panels/${w.group}.gif`"/>
                        <q-card-section class="q-pa-none text-caption">
                            {{ w.word }}
                        </q-card-section>
                    </q-card>
                </q-intersection>
            </div>
            <div v-else class="text-center">該当するワードはありません</div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

import { WordManager } from '@/WordManager';

@Component
export default class Home extends Vue {
    private wordManager = new WordManager();

    private words: Word[] = [];

    /**
     * 並べ替えタイプ
     */
    private sortType: SortType = 'number';

    /**
     * 絞り込み: 初期ワード
     */
    private isInitWords = true;
    /**
     * 絞り込み: 2021/04/30 追加分
     */
    private isAdd20210430 = true;
    /**
     * 絞り込み: フツウヨミ
     */
    private isFutsuYomi = true;
    /**
     * 絞り込み: ウラヨミ
     */
    private isUraYomi = true;
    /**
     * 絞り込み: プリコネヨミ
     */
    private isPriconneYomi = true;

    /**
     * 検索で長音符を含めるか
     */
    private enableProlongedSoundMark = true;

    /**
     * 検索タイプ
     */
    private searchType: SearchType = 'fuzzy';
    private searchText = '';

    public mounted() {
        this.words = this.wordManager.Words;
    }

    /**
     * 検索する
     */
    @Watch('sortType')
    @Watch('isInitWords')
    @Watch('isAdd20210430')
    @Watch('isFutsuYomi')
    @Watch('isUraYomi')
    @Watch('isPriconneYomi')
    @Watch('searchType')
    @Watch('searchText')
    @Watch('enableProlongedSoundMark')
    private search() {
        this.words = this.wordManager
            .Search(this.searchText, this.searchType, this.enableProlongedSoundMark)
            .NarrowDown({
                initWords: this.isInitWords,
                add20210430: this.isAdd20210430,
                futsuYomi: this.isFutsuYomi,
                uraYomi: this.isUraYomi,
                priconneYomi: this.isPriconneYomi
            })
            .Sort(this.sortType)
            .Result();
    }

    /**
     * ヨミ毎のカード色を返す
     */
    private cardColor(yomi: Yomi) {
        if (yomi === 'フツウ') return this.hexToRgba('#73af55', 0.3);
        else if (yomi === 'ウラ') return this.hexToRgba('#2ea9ff', 0.3);
        else return this.hexToRgba('#ff7faa', 0.3);
    }

    /**
     * 16進数の色をRGBAに変換する
     */
    private hexToRgba(hexColor: string, opacity: number) {
        const [, r, g, b] = /#(.{2})(.{2})(.{2})/.exec(hexColor) || [];
        return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${opacity})`;
    }

    private clearSearchText_onClick() {
        this.searchText = '';
    }

    private card_onClick(word: Word) {
        // 前方一致検索にして選択したワードに続くワードを検索する
        this.searchType = 'prefix';
        this.searchText = word.end;
    }
}
</script>

<style lang="scss" scoped>
.home > div {
    max-width: 900px;
    margin: 0 auto;
}
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
    column-gap: 10px;
    row-gap: 10px;
    .q-intersection {
        width: 80px;
        height: 140px;
        > ::v-deep div, .q-card {
            width: inherit;
            height: inherit;
        }
    }
}
</style>
