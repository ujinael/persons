
import { defineStore } from 'pinia'
import { SchedulleEvent } from '../../models/schedulle_event/schedulle_event';
import {  Api } from '../../server.api';
import { CreateSchedulleEventDto } from './dto/create-schedulleEvent.dto';
import { UpdateSchedulleEventDto } from './dto/update-schedulleEvent.dto';
type SchedulleEventsState = {
  loading: boolean
  schedulleEvent: SchedulleEvent | null
  schedulleEvents:SchedulleEvent[]
}
export const useSchedulleEventsStore = defineStore('schedulleEvents', {
  state: ():SchedulleEventsState => {
    return {
      loading:false,
      schedulleEvent: null,
     schedulleEvents:[]
    }
  },
  actions: {
setSchedulleEvents(schedulleEvent?: SchedulleEvent) {
this.schedulleEvent = schedulleEvent ?? new SchedulleEvent(new Date(),new Date())
},
async fetchSchedulleEventss() {
this.loading = true
await Api.shared().child('schedule_events')
.get<SchedulleEvent[]>([], SchedulleEvent).then(resp =>
{
this.schedulleEvents = resp
this.loading = false
}
)
},
async fetchOneSchedulleEvents(id:string) {
this.loading = true
await Api.shared().child('schedule_events',id)
.get<SchedulleEvent>([], SchedulleEvent).then(resp =>
{
this.schedulleEvent = resp
this.loading = false
}
)
},
async saveSchedulleEvents() {
this.loading = true
await Api.shared().child('schedule_events')
.post<CreateSchedulleEventDto, SchedulleEvent>(this.schedulleEvent!.toCreate(), SchedulleEvent)
.then(schedulleEvent => {
this.schedulleEvents.push(schedulleEvent)
this.loading = false
})
 },
async updateSchedulleEvents() {
this.loading = true
await Api.shared().child('schedule_events',this.schedulleEvent!.id!)
.update<UpdateSchedulleEventDto, SchedulleEvent>(this.schedulleEvent!.toUpdate(), SchedulleEvent)
.then(schedulleEvent => {
this.schedulleEvents.push(schedulleEvent)
this.loading = false
})
},
async removeSchedulleEvents(id:string) {
this.loading = true
await Api.shared().child('schedule_events',id)
.delete()
.then(schedulleEvent => {
this.schedulleEvents = this.schedulleEvents.filter(e=>e.id! !==id)
this.loading = false
})
},
  }
  })

