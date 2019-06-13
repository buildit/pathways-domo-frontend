import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MSALAuthService from './authentication';
import store from './store';
import './styles/main.scss';

Vue.config.productionTip = false;

// handle page reloads
let app;
let authService = new MSALAuthService();

if (authService.getAccount()) {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        });
    }
}
else{
    authService.login();
}
