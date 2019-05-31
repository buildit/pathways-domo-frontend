import Vue from 'vue';
import App from './App.vue';
import router from './router';
import authentication from './authentication';
import store from './store';
import './styles/main.scss';

Vue.config.productionTip = false;

// handle page reloads
let app;
authentication.initialize().then(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        });
    }
});

