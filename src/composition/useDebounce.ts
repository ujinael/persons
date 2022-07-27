import { useSubscription, fromEvent } from '@vueuse/rxjs'
import { refDebounced } from '@vueuse/core'
import {debounceTime,takeUntil} from 'rxjs'
// import { Ref } from 'vue'
// export const useDebounce = (delay:number, input:Ref<HTMLInputElement>) => {
//   const stream = useSubscription({
//         takeUntil(fromEvent(input, 'input'))

//   }
// )

//   return { stream }

// }