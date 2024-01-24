import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = "http://0.0.0.0:8010"

const access= localStorage.getItem('access');
const refresh = localStorage.getItem('refresh');

store.commit('setAccess', access);
store.commit('setRefresh', refresh);

const app = createApp(App)

app.use(store).use(router, axios).mount('#app')