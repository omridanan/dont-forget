import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';
import {Task} from "app/models/task.model";
import {AppConfig} from "../app.config";

@Injectable()
export class TasksService {
  userTasksUrl: string;
  tasksUrl: string;

  constructor(private appConfig: AppConfig,
              private http: Http) { }

  initialize(userId) {
    this.userTasksUrl = `${this.appConfig.apiUrl}/persons/${userId}/tasks`;
    this.tasksUrl = `${this.appConfig.apiUrl}/tasks`;
  }

  getTasks() {
    return this.http.get(this.userTasksUrl).map(res => res.json() as Task[]);
  }

  addTask(task: Task) {
    return this.http.post(this.userTasksUrl, task).map(res => res.json() as Task);
  }

  updateTask(task: Task) {
    return this.http.put(`${this.tasksUrl}/${task._id}`, task).map(res => res.json() as Task);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${this.tasksUrl}/${taskId}`);
  }
}
