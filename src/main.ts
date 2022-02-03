import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.provide('reducedMotion', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
app.provide('canLazyLoad', 'loading' in document.createElement('img'));
app.mount('#app');
