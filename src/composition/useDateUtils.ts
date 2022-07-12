

export const useDateUtils = () => {
  const date = (date: string|Date
    , components: {
      day?: boolean
      , month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
      , year?: boolean,
    } = { day: true, month: '2-digit', year: true }) => {
    let d = new Date(date)
    let options: Intl.DateTimeFormatOptions = {
      year: components.year ? 'numeric' : undefined
      , month:components.month? components.month:undefined
      , day:components.day ? '2-digit':undefined
    };
    let str = new Intl.DateTimeFormat('ru-RU', options).format(d)
 return str
  }
  const timeFromMinutes = (minutes: number) => {
    let date = new Date()
    date.setHours(minutes / 60)
    date.setMinutes(minutes%60)
    let options:Intl.DateTimeFormatOptions = {hour:'2-digit',minute:'2-digit'};
return new Intl.DateTimeFormat('ru-RU', options).format(date)
  }
  const dayNumber = (fromDate: Date)=>{
    return fromDate.getDate()
  }

  const timeFromDate = (fromDate: Date) => {
    const date = new Date(fromDate)
    let options:Intl.DateTimeFormatOptions = {hour:'2-digit',minute:'2-digit'};
return new Intl.DateTimeFormat('ru-RU', options).format(date)
  }
  const daysInMonth = (date:Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate();
  } 
  const startEndDates = (fromDate:Date) => {
    const startDate = new Date(fromDate)  
    startDate.setDate(1)
    const endDate = new Date(fromDate)    
    endDate.setDate(daysInMonth(fromDate))
    return {startDate:date(startDate.toString()),endDate:date(endDate.toString())}
}
  
  const getGridRowFromDate = (date: Date, startTime: Date, timeStep: number = 15) => {
    date.setSeconds(0, 0)
    startTime.setSeconds(0, 0)
    let row = ((date.getTime() - startTime.getTime()) / 60000 + timeStep) / timeStep
    
    // new Date(props.startTime.getTime()
    //   + ((event_template.value.style.gridRowStart * props.timeStep - props.timeStep) * 60000))
  return row
  }
  return {
  date,timeFromMinutes,dayNumber,timeFromDate,daysInMonth,startEndDates,getGridRowFromDate
}
}