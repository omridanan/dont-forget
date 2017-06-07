import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map';
import {AppConfig} from "../app.config";
import {User} from "../models/user.model";

@Injectable()
export class UsersService {
  usersUrl: string;

  constructor(private appConfig: AppConfig,
              private http: Http) {
    this.usersUrl = `${this.appConfig.apiUrl}/persons`;
  }

  getUser(id: string) {
    return this.http.get(`${this.usersUrl}/${id}`).map(res => res.json() as User);
  }

  getUserByFacebook(facebookId: string) {
    return this.http.get(this.usersUrl, {params: {facebookId: facebookId}})
      .map(res => {
        const users = res.json();
        if (users.length === 1) {
          return users[0] as User;
        } else {
          return null;
        }
      });
  }

  createUser(user: User) {
    return this.http.post(this.usersUrl, user).map(res => res.json() as User);
  }
}
