import {Component, OnInit} from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {Task} from "../models/task.model";
import {AppContextService} from "../services/app-context.service";

@Component({
  template: `
    <div class="container">
      <div class="panel panel-default note-editor animated bounceInDown">
        <div class="panel-body">
          <div class="form-group label-floating">
            <textarea class="form-control" #textarea autosize placeholder="Write a note" [(ngModel)]="newTask.content" 
                      (focus)="inputFocusClass = true"></textarea>
          </div>
          <div class="form-group" *ngIf="inputFocusClass">
            <button class="btn btn-primary btn-sm pull-right" (click)="addTask()">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container note grid-container animate">
      <div *ngFor='let task of tasks; trackBy: trackByFn' 
           class="panel panel-default grid-item"
           [ngClass]="{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}"
           #noteRow [attr.id]="task._id">
        <div data-toggle="modal" data-target="#note_edit_modal">
          <div class="panel-body my-note module line-clamp">
            <p>{{task.content}}</p>
          </div>
        </div>
        <div class="panel-footer label-primary-old">
          <ul class="note-footer label-primary-old">
            <li><a data-toggle="modal"
                   data-target="#remind_me_modal"
                   (click)="setRemindMeTask(task)"
                   class="btn btn-link btn-raised"
                   title="Remind">
              <i class="fa fa-bell"></i>
            </a>
            </li>
            <li>
              <a href="javascript:void(0)" (click)="deleteTask(task)" class="btn btn-link btn-raised"
                 title="Delete">
                <i class="fa fa-trash"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="{{' reminder-info'}}" *ngIf="task.reminder">
          <i class="fa fa-clock-o"></i> {{task.reminder}}<span class="pull-right">
            <a href="javascript:void(0)" (click)="removeReminder(task)"><i class="fa fa-times-circle">
          </i></a></span>
        </div>
      </div>
    </div>
    
    <!--Modals-->

    <div class="modal fade" id="remind_me_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">Remind Me</h4>
          </div>
          <div class="modal-body">
            <label><i class="fa fa-clock-o"></i> Set date and time</label>
            <div class="form-group">
              <input class="form-control"
                     readonly="readonly"
                     required
                     placeholder="Set your schedule here"
                     [(ngModel)]="remindMe.date"  
                     ngui-datetime-picker>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" (click)="remindMe.date = null">CANCEL</button>
            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" (click)="setReminderClick()">SET</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  inputFocusClass = false;
  remindMe = {
    date: null,
    task: null
  };

  newTask: Task = {
    content: ''
  };

  constructor(private appContextService: AppContextService, private tasksService: TasksService) {}

  ngOnInit(): void {
    if (this.appContextService.validateAppInitialied()) {
      this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);
    }
  }

  addTask() {
    this.tasksService.addTask(this.newTask).subscribe(task => {
      this.newTask.content = '';
      this.tasks.push(task);
      this.inputFocusClass = false;
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task._id).subscribe(() => {
      const index = this.tasks.indexOf(task, 0);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });
  }

  trackByFn(task) {
    return task._id;
  }

  setRemindMeTask(task: Task) {
    this.remindMe.task = task;
  }

  setReminderClick() {
    if (this.remindMe.date) {
      this.remindMe.task.reminder = this.remindMe.date.toString();
      this.tasksService.updateTask(this.remindMe.task).subscribe();
    }
  }

  removeReminder(task) {
    task.reminder = '';
    this.tasksService.updateTask(task).subscribe();
  }
}
