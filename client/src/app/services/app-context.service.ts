import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UsersService} from "./users.service";
import {TasksService} from "./tasks.service";
import {observable} from "rxjs/symbol/observable";

@Injectable()
export class AppContextService {
  facebookId: string;
  user: User;

  constructor(private router: Router,
              private tasksService: TasksService) {}

  validateAppInitialied() {
    if (!(this.facebookId && this.user)) {
      this.router.navigateByUrl('/login');
    } else {
      this.tasksService.initialize(this.user._id);
      return true;
    }
  }
}
