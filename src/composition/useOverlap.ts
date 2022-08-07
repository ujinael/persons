export const useOverLap = () => {
  
  const elementsOverlap = (el1:HTMLElement, el2:HTMLElement)=> {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
  }
  const selectionOverlap = (selection: { start: number, end: number }, el: HTMLElement) => {
    const domRect = el.getBoundingClientRect();
    return !(
      selection.end < domRect.left ||
      selection.start > domRect.right
    );
  }
  return {
    elementsOverlap,selectionOverlap
  }
}

