import {Component} from '@angular/core';
import {AppContextService} from "../services/app-context.service";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  template: `
    <div class="container-fluid">
      <div class="col-md-6 col-md-offset-3">
        <form [formGroup]="userForm" (ngSubmit)="createUser(userForm.value)">
          
          <app-form-field [description]="'First Name'">
            <input type="text" class="form-control" formControlName="firstName" style="width:30em;" required autofocus>
          </app-form-field>

          <app-form-field [description]="'Last Name'">
            <input type="text" class="form-control" formControlName="lastName" style="width:30em;" required autofocus>
          </app-form-field>

          <app-form-field [description]="'Email'">
            <input type="email" class="form-control" formControlName="email" style="width:30em;" required autofocus>
          </app-form-field>

          <app-form-field [description]="'Gender'">
            <select class="form-control" formControlName="gender" value="{{user.gender}}"style="width:30em" required>
              <option>Male</option>
              <option>Female</option>
            </select>
          </app-form-field>

          <app-form-field [description]="'Birthday'">
            <input type="date" class="form-control" formControlName="birthday" value="{{getBirthdayToForm()}}" 
                   style="width:30em;" required autofocus>
          </app-form-field>
          
          <app-form-field [description]="'Relationship Status'">
            <select class="form-control" formControlName="relationshipStatus" value="{{user.relationshipStatus}}"
                    style="width:30em" required>
              <option>Single</option>
              <option>In a relationship</option>
              <option>Engaged</option>
              <option>Married</option>
            </select>
          </app-form-field>

          <div class="page-header text-center text-primary" style="margin-bottom: 0em; margin-top: 0em;">
            <h3>
              I am...
            </h3>
          </div>
          <ul class="checkbox-grid">
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="isSoldier"/>
              <div class="md-chip" style="margin-left: 1em">Soldier</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="isStudent"/>
              <div class="md-chip" style="margin-left: 1em">Student</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="isRentingApartment"/>
              <div class="md-chip" style="margin-left: 1em">Renting Apartment</div></li>
          </ul>

          <div class="page-header text-center text-primary" style="margin-bottom: 0em; margin-top: 5em;">
            <h3>
              I like...
            </h3>
          </div>
          <ul class="checkbox-grid">
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeSport"/>
              <div class="md-chip" style="margin-left: 1em">Sport</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeTechnology"/>
              <div class="md-chip" style="margin-left: 1em">Technology</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeTours"/>
              <div class="md-chip" style="margin-left: 1em">Tours</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeCooking"/>
              <div class="md-chip" style="margin-left: 1em">Cooking</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeMusic"/>
              <div class="md-chip" style="margin-left: 1em">Music</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeArt"/>
              <div class="md-chip" style="margin-left: 1em">Art</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likeFinance"/>
              <div class="md-chip" style="margin-left: 1em">Finance</div></li>
            <li style="margin-top: 1em;"><input type="checkbox" formControlName="likePolitics"/>
              <div class="md-chip" style="margin-left: 1em">Politics</div></li>
          </ul>
          
            <div class="text-center" style="margin-top: 7em;">
              <button type="submit" class="btn btn-success">Register</button>
            </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  userForm: FormGroup;
  get user() { return this.appContextService.user; }

  constructor(private appContextService: AppContextService,
              private usersService: UsersService,
              private router: Router,
              private formBuiler: FormBuilder) {
    Notification.requestPermission();
    this.createForm();
  }

  createUser(value) {
    console.log(value);
    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.email = value.email;
    this.user.gender = value.gender;
    if (value.birthday.indexOf('/') > -1) {
      this.user.birthday =  value.birthday;
    } else {
      this.user.birthday = `${value.birthday.substring(5, 7)}/${value.birthday.substring(8, 10)}/${value.birthday.substring(0, 4)}`;
    }
    this.user.relationshipStatus = value.relationshipStatus;

    this.user.isSoldier = value.isSoldier;
    this.user.isStudent = value.isStudent;
    this.user.isRentingApartment = value.isRentingApartment;

    this.user.likeSport = value.likeSport;
    this.user.likeTechnology = value.likeTechnology;
    this.user.likeTours = value.likeTours;
    this.user.likeCooking = value.likeCooking;
    this.user.likeMusic = value.likeMusic;
    this.user.likeArt = value.likeArt;
    this.user.likeFinance = value.likeFinance;
    this.user.likePolitics = value.likePolitics;

    this.usersService.createUser(this.appContextService.user)
      .subscribe(user => {
        this.appContextService.user = user;
        this.router.navigateByUrl('/tasks');
      });
  }

  createForm() {
    this.userForm = this.formBuiler.group({
      firstName: [this.user.firstName, Validators.required ],
      lastName: [this.user.lastName, Validators.required ],
      email: [this.user.email, Validators.required ],
      gender: [this.user.gender, Validators.required ],
      birthday: [this.user.birthday, Validators.required ],
      relationshipStatus: [this.user.relationshipStatus, Validators.required ],

      isSoldier: [false],
      isStudent: [false],
      isRentingApartment: [false],

      likeSport: [false],
      likeTechnology: [false],
      likeTours: [false],
      likeCooking: [false],
      likeMusic: [false],
      likeArt: [false],
      likeFinance: [false],
      likePolitics: [false],
    });
  }

  getBirthdayToForm() {
    const birthday = this.user.birthday;
    return `${birthday.substring(6, 11)}-${birthday.substring(0, 2)}-${birthday.substring(3, 5)}`;
  }
}
