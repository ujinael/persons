import { defineStore } from 'pinia';
import { SchedulleInterval } from '../../models';
import { EmployerSchedulle } from '../../models/employer_schedulle/EmployerSchedulle';
import { TaskSchedulle } from '../../models/task_schedulle/task_schedulle';
import { Api } from '../../server.api';
import { CreateTaskSchedulleDto } from './dto/create-task-schedulle.dto';
import { UpdateTaskSchedulleDto } from './dto/update-task-schedulle.dto';
type TaskSchedullesState = {
  loading: boolean;
  currentDate: Date;
  taskSchedulle: TaskSchedulle | null;
  taskSchedulles: TaskSchedulle[];
  employerSchedulles: EmployerSchedulle[];
  organizationWorkingInterval:SchedulleInterval|null
};
export const useTaskSchedullesStore = defineStore('taskSchedulles', {
  state: (): TaskSchedullesState => {
    return {
      currentDate: new Date(),
      loading: false,
      taskSchedulle: null,
      taskSchedulles: [],
      employerSchedulles: [],
      organizationWorkingInterval: new SchedulleInterval(
        new Date(2022, 8, 5, 9, 0, 0)
        , new Date(2022, 8, 5, 20, 0, 0))
    };
  },
  actions: {
    setTaskSchedulle(taskSchedulle?: TaskSchedulle) {
      this.taskSchedulle = taskSchedulle ?? new TaskSchedulle();
    },
    async fetchEmployerSchedulle() {

    
      await Api.shared()
        .child('employer_schedulles')
        .get<EmployerSchedulle[]>([{key:'date',value:this.currentDate.toISOString()}], EmployerSchedulle)
        .then((r) => {


       this.employerSchedulles = r   
          
        });

    },
    async fetchTaskSchedulles() {
      this.loading = true;
      await Api.shared()
        .child('task_schedulles')
        .get<TaskSchedulle[]>([], TaskSchedulle)
        .then((resp) => {
          this.taskSchedulles = resp;
          this.loading = false;
        });
    },
    async fetchOneTaskSchedulle(id: string) {
      this.loading = true;
      await Api.shared()
        .child('task_schedulles', id)
        .get<TaskSchedulle>([], TaskSchedulle)
        .then((resp) => {
          this.taskSchedulle = resp;
          this.loading = false;
        });
    },
    async saveTaskSchedulle() {
      this.loading = true;
      await Api.shared()
        .child('task_schedulles')
        .post<CreateTaskSchedulleDto, TaskSchedulle>(
          this.taskSchedulle!.toCreate(),
          TaskSchedulle,
        )
        .then((taskSchedulle) => {
          this.taskSchedulles.push(taskSchedulle);
          this.loading = false;
        });
    },
    async updateTaskSchedulle() {
      this.loading = true;
      await Api.shared()
        .child('task_schedulles', this.taskSchedulle!.id!)
        .update<UpdateTaskSchedulleDto, TaskSchedulle>(
          this.taskSchedulle!.toUpdate(),
          TaskSchedulle,
        )
        .then((taskSchedulle) => {
          this.taskSchedulles.push(taskSchedulle);
          this.loading = false;
        });
    },
    async removeTaskSchedulle(id: string) {
      this.loading = true;
      await Api.shared()
        .child('task_schedulles', id)
        .delete()
        .then((taskSchedulle) => {
          this.taskSchedulles = this.taskSchedulles.filter((e) => e.id! !== id);
          this.loading = false;
        });
    },
  },
});
