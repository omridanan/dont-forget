import {Component, OnInit} from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from "ngx-facebook";
import {AppContextService} from "../services/app-context.service";
import {Router} from "@angular/router";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {UsersService} from "../services/users.service";
import {User} from "../models/user.model";

@Component({
  template: `
  `
})
export class LoginComponent implements OnInit {
  constructor(private facebookService: FacebookService,
              private usersService: UsersService,
              private appContextService: AppContextService,
              private router: Router) {}

  ngOnInit(): void {
    const initParams: InitParams = {
      appId: '1452999264759953',
      xfbml: true,
      version: 'v2.8'
    };

    this.facebookService.init(initParams);
    this.loginWithFacebook();
  }

  loginWithFacebook(): void {
    const permissions = 'email,user_birthday,user_relationships';
    this.facebookService.login({scope: permissions})
      .then((response: LoginResponse) => {
        this.appContextService.facebookId = response.authResponse.userID;
        this.usersService.getUserByFacebook(this.appContextService.facebookId)
        .subscribe(
          user => {
            if (user) {
              this.appContextService.user = user;
              this.router.navigateByUrl('/tasks');
            } else {
              this.navigateToRegister();
            }
          }
        );
      })
      .catch((error: any) => console.error(error));
  }

  navigateToRegister(): void {
    const requestFields = 'email,birthday,first_name,last_name,gender,relationship_status';
    this.facebookService.api(`/me?fields=${requestFields}`).then(res => {
      const birthday = this.isFullBirthday(res.birthday) ? res.birthday : '';
      this.appContextService.user = <User> {
        facebookId: this.appContextService.facebookId,
        email: res.email,
        birthday: birthday,
        firstName: res.first_name,
        lastName: res.last_name,
        gender: res.gender.charAt(0).toUpperCase() + res.gender.slice(1),
        relationshipStatus: res.relationship_status
      };
      this.router.navigateByUrl('/register');
    });
  }

  private isFullBirthday(birthday: string) {
    if (birthday == undefined) return false;
    
    return (birthday.match(/\//g) || []).length === 2;
  }
}
