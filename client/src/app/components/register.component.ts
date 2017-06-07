import {Component} from '@angular/core';
import {AppContextService} from "../services/app-context.service";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";

@Component({
  template: `
    Register Component
    <button (click)="createUser()">Register</button>
  `
})
export class RegisterComponent {
  constructor(private appContextService: AppContextService,
              private usersService: UsersService,
              private router: Router) {}

  createUser() {
    console.log(this.appContextService.user);
    this.usersService.createUser(this.appContextService.user)
      .subscribe(user => {
        this.appContextService.user = user;
        this.router.navigateByUrl('/tasks');
      });
  }
}
