import Vue from 'vue';

import router from '@/router';
import App from '@/layouts/App.vue';

import '@/registerServiceWorker';
import '@/plugins/quasar';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
