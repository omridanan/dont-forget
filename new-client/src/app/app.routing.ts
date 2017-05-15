import { NgModule }       from '@angular/core';
import { Routes,
         RouterModule }   from '@angular/router';
import { BinComponent,
         HomeComponent,
         ArchiveComponent,
         AboutComponent } from './components';
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: HomeComponent },
  { path: 'archive-notes', component: ArchiveComponent },
  { path: 'recycle-bin', component: BinComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
