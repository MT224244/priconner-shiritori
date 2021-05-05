/**
 * ヨミタイプ
 */
type Yomi =
    | 'フツウ'
    | 'ウラ'
    | 'プリコネ';

/**
 * ワードデータ
 */
type Word = {
    no: number;
    group: string;
    yomi: Yomi;
    word: string;
    start: string;
    end: string;
};

/**
 * 並べ替えタイプ
 */
 type SortType =
 | 'number'
 | 'syllabary';

/**
* 検索タイプ
*/
type SearchType =
 | 'fuzzy'
 | 'prefix'
 | 'suffix';
