import { Directive, DirectiveBinding } from 'vue'
import {ResizeConstraints,ResizeHooks} from './VGridResizable'

export const vResizable: Directive = {
  
  mounted(el: HTMLElement, binding: DirectiveBinding<{
    hooks?: ResizeHooks
    resizeStep?:number
  }>) {
    console.log(binding.value.resizeStep);
    
    const constraints = binding.arg as ResizeConstraints
    const resizeStep = binding.value.resizeStep ?? 10
    // el.style.position = 'absolute'
    const topResizer = document.createElement('div')
    topResizer.classList.add('resizer', 'top')
    topResizer.style.width = '100%'
    topResizer.style.height = '4px'
    topResizer.style.position = 'absolute'
    topResizer.style.top = '0px'
    topResizer.style.cursor = 'n-resize'
    
    const bottomResizer = document.createElement('div')
    bottomResizer.classList.add('resizer', 'bottom')
    bottomResizer.style.width = '100%'
    bottomResizer.style.height = '4px'
    bottomResizer.style.position = 'absolute'
    bottomResizer.style.bottom = '0px'
    bottomResizer.style.cursor = 's-resize'
    el.insertAdjacentElement('afterbegin', topResizer)
    el.insertAdjacentElement('afterbegin', bottomResizer)

    const onMouseDown = (e: MouseEvent, resizerType: 'top' | 'bottom') => {
      if (binding.value.hooks && binding.value.hooks.start) binding.value.hooks.start(el, resizerType)
      document.documentElement.style.cursor = resizerType === 'top' ? 'n-resize' : 's-rezize'
      document.body.onselectstart = function (e) { return false };

      var rect = el.getBoundingClientRect()
      let newHeight = el.clientHeight;
      let elTop = +el.style.top.replace(/[^0-9]/g,'')      
      var vOffSet = e.clientY - rect.top

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      function onMouseMove(ev: MouseEvent) {
       
       
        if (resizerType == 'bottom') {
           vOffSet = ev.clientY - rect.top
          if (vOffSet > newHeight + resizeStep) {
            if(constraints && constraints.bottom && elTop + newHeight + resizeStep > constraints.bottom)
            return
            newHeight = newHeight + resizeStep
          }
          if (vOffSet < newHeight - resizeStep) {
      if(constraints && constraints.minHeight&& newHeight - resizeStep < constraints.minHeight)
              return
            newHeight = newHeight - resizeStep
          }
          el.style.height = newHeight + 'px'
        }
        if (resizerType == 'top') {
          vOffSet =   rect.bottom - ev.clientY
          if (vOffSet > newHeight + resizeStep) {
            if(constraints && (constraints.top ||constraints.top == 0 ) && elTop - resizeStep < constraints.top)
            return
          newHeight = newHeight + resizeStep
          elTop = elTop - resizeStep
        }
          if (vOffSet < newHeight - resizeStep) {
            if(constraints && constraints.minHeight&& newHeight - resizeStep < constraints.minHeight)
            return
            newHeight = newHeight - resizeStep
            elTop = elTop + resizeStep
          }
        el.style.top = elTop + 'px'
        el.style.height = newHeight + 'px'
        }
        if(binding.value.hooks && binding.value.hooks.resizing)binding.value.hooks.resizing(el)
      }
      function onMouseUp(e: MouseEvent) {        
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        if (binding.value.hooks && binding.value.hooks.stop) binding.value.hooks.stop(el)
        document.documentElement.style.cursor = 'default'
      }
    }
topResizer.addEventListener('mousedown',(ev)=>{onMouseDown(ev,'top')})
bottomResizer.addEventListener('mousedown',(ev)=>{onMouseDown(ev,'bottom')})

  }
}
