import 'reflect-metadata'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import directives from './directives'

import router from './router'
import { components } from './components'
import App from './App.vue'
import { test } from './stores/utils/deserializator'
import { VPhonemask } from './directives/VPhonemask'
import messagePlugin from './plugins/message.plugin'
import { useGlobalStore } from './stores/modules/global/useGlobalStore'
import { vFocus } from './directives/VFocus'
import { vSelectableArea } from './directives/VSelectionArea'
import { vGridResizable } from './directives/VGridResizable'
import { vResizable } from './directives/VResizable'
test()
const app = createApp(App)
app.use(router)
app.use(createPinia())
components.forEach(component => {
  app.component(component.name ?? '', component)
});
const store = useGlobalStore()
// directives.forEach(directive => {
// });
// for (var key in directives) {
app.directive('phonemask', VPhonemask)
app.directive('focus', vFocus)
app.directive('selectable-area', vSelectableArea)
app.directive('grid-resizable', vGridResizable)
app.directive('resizable', vResizable)

app.config.errorHandler = (er, instanse) => {
  // console.log(er);
  store.setError(er as Error)
}
// }
app.mount('#app')
