import {Component, OnInit} from '@angular/core';
import {TasksService} from "../services/tasks.service";
import {Task} from "../models/task.model";
import {AppContextService} from "../services/app-context.service";
declare const $;
declare const Notification;

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
        <div class="panel-footer" [ngClass]="{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}">
          <ul class="note-footer" [ngClass]="{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}">
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

    <div class="modal fade" id="intro_suggested_tasks">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">New suggested tasks</h4>
          </div>
          <div class="modal-body">
            <div>
              Hi {{appContextService.user.firstName}}
            </div>
            <div>
              Based on your profile, we've found some tasks that might be interest to you.
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" 
                    (click)="openSuggestedTasksModal()">Let's Start</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="new_suggested_task">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">New suggested task</h4>
          </div>
          <div class="modal-body">
            <div *ngIf="suggestedTasks.length > 0">
              {{this.suggestedTasks[0]}}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" (click)="passSuggestedTask()">Pass</button>
            <button type="button" class="btn btn-primary btn-sm" (click)="addSuggestedTask()">Add Task</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="done_suggested_tasks">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">We're done</h4>
          </div>
          <div class="modal-body">
            <div>
              We're glad we helped you to not forget this time.
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
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

  suggestedTasks: string[] = [];

  constructor(private appContextService: AppContextService, private tasksService: TasksService) {}

  ngOnInit(): void {
    Notification.requestPermission();
    if (this.appContextService.validateAppInitialied()) {
      this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);

      setTimeout(() => {
        this.tasksService.getSuggestedTasks().subscribe(suggestedTasks => {
          this.suggestedTasks = suggestedTasks;
          if (this.suggestedTasks.length > 0) {
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Come check out new suggested tasks!");
            }
            this.openSuggestedTasksIntroModal();
          }
        });
      }, 10000);
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

  openSuggestedTasksIntroModal() {
    $('#intro_suggested_tasks').modal();
  }

  openSuggestedTasksModal() {
    $('#new_suggested_task').modal();
  }

  passSuggestedTask() {
    $('#new_suggested_task').on('hidden.bs.modal', () => {
      this.suggestedTasks.splice(0, 1);
      if (this.suggestedTasks.length > 0) {
        this.openSuggestedTasksModal();
      } else {
        $('#done_suggested_tasks').modal();
      }
      $('#new_suggested_task').off('hidden.bs.modal');
    });
    $('#new_suggested_task').modal('hide');
  }

  addSuggestedTask() {
    this.tasksService.addTask({content: this.suggestedTasks[0], isSuggested: true}).subscribe(task => {
      this.tasks.push(task);
    });
    this.passSuggestedTask();
  }
}
