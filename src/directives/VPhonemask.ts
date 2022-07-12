import {Directive} from 'vue'
export const VPhonemask: Directive = {
   
  mounted(el: HTMLElement) {
     
    function getInputNumbersValue(input: HTMLInputElement) {
      return input.value.replace(/\D/g, '')
    }
    var onPhonePaste = function (e: Event) {
      var input = e.target as HTMLInputElement,
        inputNumbersValue = getInputNumbersValue(input);
      const ev = e as ClipboardEvent
      var pasted = ev.clipboardData //|| window.clipboardData;
      if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
          // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
          // formatting will be in onPhoneInput handler
          input.value = inputNumbersValue;
          return;
        }
      }
    }
    var onPhoneInput = function (ev:Event) {
      var input = ev.target as HTMLInputElement,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";
const e = ev as InputEvent
      if (!inputNumbersValue) {
        return input.value = "";
      }

      if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
          // Attempt to input non-numeric symbol
          input.value = inputNumbersValue;
        }
        return;
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (ev: Event) {
      const e = ev as KeyboardEvent
const input = e.target as HTMLInputElement
      // Clear input after remove last symbol
      var inputValue = input.value.replace(/\D/g, '');
      if (e.key == '8' && inputValue.length == 1) {
        input.value = "";
      }
    }
      el.addEventListener('keydown', onPhoneKeyDown);
      el.addEventListener('input', onPhoneInput, false);
      el.addEventListener('paste', onPhonePaste, false);
  }
}
// export default VPhonemask