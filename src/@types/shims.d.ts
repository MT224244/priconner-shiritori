type Yomi =
    | 'フツウ'
    | 'ウラ'
    | 'プリコネ';

type Word = {
    no: number;
    group: string;
    yomi: Yomi;
    word: string;
    start: string;
    end: string;
};

type Words = Word[];
