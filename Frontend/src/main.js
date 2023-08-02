import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faEdit, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue'

library.add( faCircle, faCheckCircle, faTrashAlt, faEdit);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
