import { App } from "vue";

export default {
  install(app: App<Element>,...options: any[]) {
    app.config.globalProperties.$error = false
  }
}