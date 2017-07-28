import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TasksComponent} from "./components/tasks.component";
import {AppConfig} from "./app.config";
import {TasksService} from "./services/tasks.service";
import {AppContextService} from "./services/app-context.service";
import {FacebookModule} from "ngx-facebook";
import {LoginComponent} from "./components/login.component";
import {RegisterComponent} from "./components/register.component";
import {UsersService} from "./services/users.service";
import {NguiDatetimePickerModule} from "@ngui/datetime-picker";
import {FormFieldComponent} from "./components/text-form-field.component";

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    LoginComponent,
    RegisterComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FacebookModule.forRoot(),
    NguiDatetimePickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    AppConfig,
    AppContextService,
    TasksService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
