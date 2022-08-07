
import { Type } from "class-transformer"
import {CreateTaskSchedulleDto} from '../../modules/task_schedulles/dto/create-task-schedulle.dto'
import {UpdateTaskSchedulleDto} from '../../modules/task_schedulles/dto/update-task-schedulle.dto'
export class TaskSchedulle {
id?:string

toCreate():CreateTaskSchedulleDto{
return {}

}
toUpdate():UpdateTaskSchedulleDto{
return {}

}

}

