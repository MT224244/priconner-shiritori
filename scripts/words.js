// @ts-check

/*
 * words.jsonのwordからstartとendを入力するスクリプト
 */

const { readFileSync, writeFileSync } = require('fs');

const wordsFilePath = 'src/assets/words.json';

/**
 * @type {{
 *      no: number;
 *      group: string;
 *      yomi: 'フツウ' | 'ウラ' | 'プリコネ';
 *      word: string;
 *      start: string;
 *      end: string;
 * }[]}
 */
const words = JSON.parse(readFileSync(wordsFilePath, 'utf-8'));

words.forEach((w, i) => {
    const word = w.word
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
        .replace(/[\u30fc]/g, ''); // 長音符を削除

    words[i].start = word[0];
    words[i].end = word[word.length - 1];
});

writeFileSync(wordsFilePath, JSON.stringify(words, undefined, 4));
