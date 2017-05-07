import { Injectable } from '@angular/core';
import {FacebookService} from "./facebook.service";

@Injectable()
export class LoginService {

  constructor(private facebookService: FacebookService) { }

}
