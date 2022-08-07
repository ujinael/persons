import { Directive, DirectiveBinding } from 'vue'

interface SelectionRectangle {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
interface SelectionHooks {
  show?: (el: HTMLDivElement) => {},
  resizing?: (el: HTMLDivElement) => {},
  hide?:(el: HTMLDivElement) => {}
}


export const vSelectableArea: Directive = {
   
  mounted(el: HTMLDivElement,binding:DirectiveBinding<SelectionHooks>) {
    const rect = el


    const initEventHandlers = () => {
      var isMouseDown = false;
      var selectionRectangle: SelectionRectangle = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };
    
      function onMouseDown(e: MouseEvent) {
        isMouseDown = true;
        selectionRectangle.left = e.clientX;
        selectionRectangle.top = e.clientY;
       if(binding.value.show) binding.value.show(rect)
      }
    
      function onMouseMove(e: MouseEvent) {
        if (!isMouseDown) {
          return;
        }
    
        selectionRectangle.right = e.clientX;
        selectionRectangle.bottom = e.clientY;
        showSelectionRectangle(selectionRectangle);
        if(binding.value.resizing) binding.value.resizing(rect)

      }
    
      function onMouseUp(e: MouseEvent) {
        isMouseDown = false;
        if(binding.value.hide) binding.value.hide(rect)

        hideSelectionRectangle();
        selectionRectangle = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        };
      }
    
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    const hideSelectionRectangle = () => {
      // var rect = getSelectionRectNode();
      // if (rect) {
      rect.style.display = 'none';
        // rect.style.opacity = 0 + '';
      // }
    };
    
    const showSelectionRectangle = (selection: SelectionRectangle) => {
      // var rect = getSelectionRectNode();
      // if (rect) {  
      rect.style.display = 'block';

        rect.style.left = `${selection.left}px`;
        rect.style.top = `${selection.top + window.scrollY}px`;
        rect.style.width = `${selection.right - selection.left}px`;
        rect.style.height = `${selection.bottom - selection.top}px`;
      // rect.style.opacity = 0.3 + '';

      // }
    };

    initEventHandlers()
  }
}