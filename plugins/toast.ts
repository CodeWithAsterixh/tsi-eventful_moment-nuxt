// plugins/vue3-toastify.ts
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Install the Toastify plugin with optional global configuration.
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 3000, position:"top-right" });

  // Provide the toast instance globally so you can use it in your components.
  return {
    provide: { toast }
  };
});
