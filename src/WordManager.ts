import words from '@/assets/words.json';

/**
 * 絞り込みオプション
 */
type NarrowDownOptions = {
    initWords: boolean;
    add20210430: boolean;
    futsuYomi: boolean;
    uraYomi: boolean;
    priconneYomi: boolean;
};

export class WordManager {
    private allWords = words as Word[];

    private words = this.allWords;

    /**
     * 全てのワード
     */
    public get Words(): Word[] { return [...this.allWords]; }

    /**
     * 処理した結果を返す
     * @returns 処理されたワード一覧
     */
    public Result() {
        const tmp = [...this.words];
        this.words = this.allWords;

        return tmp;
    }

    public Sort(sortType: SortType) {
        this.words = this.words.sort((x, y) => {
            if (sortType === 'number') return x.no - y.no;
            else return x.start.localeCompare(y.start, 'ja');
        });

        return this;
    }

    /**
     * 指定した条件で絞り込む
     * @param opt 絞り込みオプション
     * @returns this
     */
    public NarrowDown(opt: NarrowDownOptions) {
        this.words = this.words
            .filter(x => opt.initWords ? true : x.no >= 506)
            .filter(x => opt.add20210430 ? true : x.no <= 505)
            .filter(x => opt.futsuYomi ? true : x.yomi !== 'フツウ')
            .filter(x => opt.uraYomi ? true : x.yomi !== 'ウラ')
            .filter(x => opt.priconneYomi ? true : x.yomi !== 'プリコネ');

        return this;
    }

    /**
     * ワードを検索する
     * @param word 検索ワード
     * @param type 検索タイプ
     * @returns this
     */
    public Search(word: string, type: SearchType, enableProlongedSoundMark: boolean) {
        const formattedWord = this.format(word, enableProlongedSoundMark);

        this.words = this.words.filter(x => {
            if (type === 'fuzzy') {
                return this.format(x.word, enableProlongedSoundMark).match(new RegExp(formattedWord));
            }
            else if (type === 'prefix') {
                return this.format(x.word, enableProlongedSoundMark).startsWith(formattedWord);
            }
            else {
                return this.format(x.word, enableProlongedSoundMark).endsWith(formattedWord);
            }
        });

        return this;
    }

    /**
     * 状態をリセット
     * @returns this
     */
    public Reset() {
        this.words = this.allWords;
        return this;
    }

    /**
     * 検索用のフォーマットに変換する
     * @param word ワード
     * @returns フォーマットされたワード
     */
    private format(word: string, enableProlongedSoundMark: boolean) {
        return word
            .replace(/[\u30a1-\u30f6]/g, match => {
                // カタカナをひらがなに変換
                const char = match.charCodeAt(0) - 0x60;
                return String.fromCharCode(char);
            })
            .replace(/[\u3041\u3043\u3045\u3047\u3049\u3083\u3085\u3087]/g, match => {
                // 捨て仮名をひらがなに変換
                const char = match.charCodeAt(0) + 0x01;
                return String.fromCharCode(char);
            })
            .replace(/[\u30fc]/g, match => {
                // 長音符を含めない場合は削除
                if (enableProlongedSoundMark) return match;
                else return '';
            });
    }
}
