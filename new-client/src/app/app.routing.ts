import { NgModule }       from '@angular/core';
import { Routes,
         RouterModule }   from '@angular/router';
import {HomeComponent} from './components';
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: HomeComponent },
  /*{ path: 'archive-notes', component: ArchiveComponent },
  { path: 'recycle-bin', component: BinComponent },*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
