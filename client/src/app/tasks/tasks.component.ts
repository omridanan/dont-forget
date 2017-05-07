import { Component, OnInit } from '@angular/core';
import {TasksService} from "../tasks.service";
declare var swal: any;

export class Todo {
  completed: Boolean;
  editing: Boolean;
  time: string;

  private _title: String;
  get title() {
    return this._title;
  }
  set title(value: String) {
    this._title = value.trim();
  }

  constructor(title: String, time) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
    this.time = time;
  }
}

export class TodoStore {
  todos: Array<Todo>;

  constructor() {
    let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
    // Normalize back into classes
    this.todos = persistedTodos.map( (todo: {_title: String, completed: Boolean, time}) => {
      let ret = new Todo(todo._title, todo.time);
      ret.completed = todo.completed;
      return ret;
    });
  }

  private updateStore() {
    localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
  }

  private getWithCompleted(completed: Boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: Boolean) {
    this.todos.forEach((t: Todo) => t.completed = completed);
    this.updateStore();
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: String) {
    this.todos.push(new Todo(title, "2017-09-16"));
    this.updateStore();
  }
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TodoStore]
})
export class TasksComponent {
  todoStore: TodoStore;
  newTodoText = '';

  constructor(todoStore: TodoStore) {
    this.todoStore = todoStore;


    setTimeout(() => {
      this.a((text: string) => {this.todoStore.add('visit dentist')});
    }, 10000);
  }

  a(add) {
    swal({
        title: "New suggested task",
        text: "It seems to be that you didn't visit the dentist for long time. Would you want to be reminded every 6 months? ",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#3fc3ee",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(
      function (isConfirm) {
        if (isConfirm) {
          add();
        }
      });
  }


  stopEditing(todo: Todo, editedTitle: string) {
    todo.title = editedTitle;
    todo.editing = false;
  }

  cancelEditingTodo(todo: Todo) {
    todo.editing = false;
  }

  updateEditingTodo(todo: Todo, editedTitle: string) {
    editedTitle = editedTitle.trim();
    todo.editing = false;

    if (editedTitle.length === 0) {
      return this.todoStore.remove(todo);
    }

    todo.title = editedTitle;
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  removeCompleted() {
    this.todoStore.removeCompleted();
  }

  toggleCompletion(todo: Todo) {
    this.todoStore.toggleCompletion(todo);
  }

  remove(todo: Todo){
    this.todoStore.remove(todo);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoStore.add(this.newTodoText);
      this.newTodoText = '';
    }
  }
}
