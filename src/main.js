import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from '@/app.vue'
import { routes } from '@/routes.js'
import store from "@/store/index"

import "notyf/notyf.min.css";
import '@/tailwind.css'
import '@/styles.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.directive('click-outside', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})


app.use(createStore(store))
app.use(router)
app.mount('#app')
