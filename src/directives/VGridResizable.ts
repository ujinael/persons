import { Directive, DirectiveBinding } from 'vue'

export interface ResizeConstraints {
  top?: number;
  maxHeight?: number;
  minHeight?: number;
  bottom?: number;
}
export interface ResizeHooks {
  start?: (el: HTMLElement, resizerType:'top'|'bottom') => {},
  resizing?: (el: HTMLElement) => {},
  stop?:(el: HTMLElement) => {}
}
export const vGridResizable: Directive = {
  
  mounted(el: HTMLElement, binding: DirectiveBinding<{
    hooks?: ResizeHooks
    resizeStep?:number
  }>) {
    const constraints = binding.arg as ResizeConstraints
    const resizeStep = binding.value.resizeStep ?? 5
    el.style.position = 'relative'
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

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      function onMouseMove(ev: MouseEvent) {
       
        const cE = Number.parseInt(el.style.gridColumnEnd)
        const cS = Number.parseInt(el.style.gridColumnStart)
        const rE = +el.style.gridRowEnd
        const rS = +el.style.gridRowStart
        if (resizerType == 'bottom') {
          
          var vOffSet = rect.y + newHeight - ev.clientY          
          if (vOffSet < 0 && rE + 1 <= constraints.bottom!) {
            newHeight = newHeight + constraints.minHeight!
            el.style.gridRowEnd =  rE + 1 + ''
                      }
          if ( vOffSet > constraints.minHeight! && (rE - rS) > 1) {
            newHeight = newHeight - constraints.minHeight!
            el.style.gridRowEnd = rE - 1 + ''
          }
        }
        
          
      if (resizerType == 'top') {
        vOffSet = rect.y - ev.clientY
        if(vOffSet<constraints.minHeight! * -1 && (rE - rS)>1){
         rect.y = rect.y + constraints.minHeight!
        el.style.gridRowStart = rS + 1 + ''  

        }
        if (vOffSet > 0 && rS-1 >= constraints.top!){
          rect.y = rect.y - constraints.minHeight!
          el.style.gridRowStart = rS - 1  + '' 
        }  
         
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
