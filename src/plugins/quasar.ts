import Vue from 'vue';
import { Quasar } from 'quasar';
import iconSet from 'quasar/icon-set/mdi-v5';
import lang from 'quasar/lang/ja';

import '@/styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v5/mdi-v5.css';

Vue.use(Quasar, {
    config: {},
    plugins: {},
    lang,
    iconSet
});
