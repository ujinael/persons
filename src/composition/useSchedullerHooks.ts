import { computed } from "vue";
import { DaySchedulle, TimeCell } from "../stores/models";

export const useSchedullerHooks = (startTime: Date
  , endTime: Date, timeStep: number = 15, rowHeight: number = 115
  ) => {
    const hoursCount = computed(()=>{
      return endTime.getHours() - startTime.getHours()
  })
  
  const hoursIntervalsCount = computed(()=>{
      return 60/timeStep
  })
  const timeslots = computed(()=>{
   return  [...Array(hoursCount.value).keys()]
      .map( i => i + startTime.getHours())
      .map(i=>{   
  return i + ':00'
      })
  })
  
  const cellsCount = computed(()=>{
      return hoursCount.value * hoursIntervalsCount.value})

      const timeCells = (timeTable:DaySchedulle)=>{
       let sDate = new Date(startTime)
    let eDate = new Date(+sDate + 60000*timeStep) 
        
        return   [...Array(cellsCount.value).keys()].map(i=>{
    let cell:TimeCell = {
        employerId:timeTable.employer?.id ?? '',
        start:sDate, 
     end:eDate,
    class: sDate
    .getTime() >= timeTable.start!
    .getTime() && eDate.getTime() <= timeTable.end!
    .getTime() ?'working' : 'time',
        number:i,
        style:
                   {
    height:rowHeight/hoursIntervalsCount.value,
    gridRowStart:i+1,
    gridRowEnd:i+2,
                   },
                   }
    sDate = eDate
            eDate = new Date(+sDate + 60000 * timeStep)
                   return cell
        })   
     
    }
  
return {hoursCount,hoursIntervalsCount,timeslots,cellsCount,timeCells}


}