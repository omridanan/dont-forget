webpackJsonp([1,4],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 109;


/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(119);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_tasks_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_login_component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_register_component__ = __webpack_require__(68);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_3__components_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'register',
        component: __WEBPACK_IMPORTED_MODULE_4__components_register_component__["a" /* RegisterComponent */]
    },
    {
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_2__components_tasks_component__["a" /* TasksComponent */]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: "\n    <div class=\"page-header text-center text-primary\">\n      <h2>\n        Don't Forget\n      </h2>\n    </div>\n    <router-outlet></router-outlet>\n  "
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tasks_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_tasks_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_app_context_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_facebook__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_login_component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_register_component__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_users_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngui_datetime_picker__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngui_datetime_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__ngui_datetime_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_text_form_field_component__ = __webpack_require__(118);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__components_tasks_component__["a" /* TasksComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_text_form_field_component__["a" /* FormFieldComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_10_ngx_facebook__["a" /* FacebookModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_14__ngui_datetime_picker__["NguiDatetimePickerModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* AppConfig */],
            __WEBPACK_IMPORTED_MODULE_9__services_app_context_service__["a" /* AppContextService */],
            __WEBPACK_IMPORTED_MODULE_8__services_tasks_service__["a" /* TasksService */],
            __WEBPACK_IMPORTED_MODULE_13__services_users_service__["a" /* UsersService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormFieldComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FormFieldComponent = (function () {
    function FormFieldComponent() {
    }
    return FormFieldComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FormFieldComponent.prototype, "description", void 0);
FormFieldComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-form-field',
        template: "    \n    <div class=\"row\">\n      <div class=\"col-md-3\" style=\"text-align: right; padding-top: .7rem;\">\n        <label>{{description}}</label>\n      </div>\n      <div class=\"col-md-9\">\n        <div class=\"form-group\">\n          <div class=\"input-group\">\n            <ng-content></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
    })
], FormFieldComponent);

//# sourceMappingURL=text-form-field.component.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(110);


/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tasks_service__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppContextService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppContextService = (function () {
    function AppContextService(router, tasksService) {
        this.router = router;
        this.tasksService = tasksService;
    }
    AppContextService.prototype.validateAppInitialied = function () {
        if (!(this.facebookId && this.user)) {
            this.router.navigateByUrl('/login');
        }
        else {
            this.tasksService.initialize(this.user._id);
            return true;
        }
    };
    return AppContextService;
}());
AppContextService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__tasks_service__["a" /* TasksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__tasks_service__["a" /* TasksService */]) === "function" && _b || Object])
], AppContextService);

var _a, _b;
//# sourceMappingURL=app-context.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppConfig = (function () {
    function AppConfig() {
        this.apiUrl = 'https://dont-forget2-bityob.c9users.io:8080';
    }
    return AppConfig;
}());
AppConfig = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], AppConfig);

//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TasksService = (function () {
    function TasksService(appConfig, http) {
        this.appConfig = appConfig;
        this.http = http;
    }
    TasksService.prototype.initialize = function (userId) {
        this.userTasksUrl = this.appConfig.apiUrl + "/persons/" + userId + "/tasks";
        this.suggestedTasksUrl = this.appConfig.apiUrl + "/persons/" + userId + "/suggested_tasks";
        this.tasksUrl = this.appConfig.apiUrl + "/tasks";
    };
    TasksService.prototype.getTasks = function () {
        return this.http.get(this.userTasksUrl).map(function (res) { return res.json(); });
    };
    TasksService.prototype.getSuggestedTasks = function () {
        return this.http.get(this.suggestedTasksUrl).map(function (res) { return res.json(); });
    };
    TasksService.prototype.addTask = function (task) {
        return this.http.post(this.userTasksUrl, task).map(function (res) { return res.json(); });
    };
    TasksService.prototype.updateTask = function (task) {
        return this.http.put(this.tasksUrl + "/" + task._id, task).map(function (res) { return res.json(); });
    };
    TasksService.prototype.deleteTask = function (taskId) {
        return this.http.delete(this.tasksUrl + "/" + taskId);
    };
    return TasksService;
}());
TasksService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object])
], TasksService);

var _a, _b;
//# sourceMappingURL=tasks.service.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersService = (function () {
    function UsersService(appConfig, http) {
        this.appConfig = appConfig;
        this.http = http;
        this.usersUrl = this.appConfig.apiUrl + "/persons";
    }
    UsersService.prototype.getUser = function (id) {
        return this.http.get(this.usersUrl + "/" + id).map(function (res) { return res.json(); });
    };
    UsersService.prototype.getUserByFacebook = function (facebookId) {
        return this.http.get(this.usersUrl, { params: { facebookId: facebookId } })
            .map(function (res) {
            var users = res.json();
            if (users.length === 1) {
                return users[0];
            }
            else {
                return null;
            }
        });
    };
    UsersService.prototype.createUser = function (user) {
        return this.http.post(this.usersUrl, user).map(function (res) { return res.json(); });
    };
    return UsersService;
}());
UsersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object])
], UsersService);

var _a, _b;
//# sourceMappingURL=users.service.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_facebook__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_users_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = (function () {
    function LoginComponent(facebookService, usersService, appContextService, router) {
        this.facebookService = facebookService;
        this.usersService = usersService;
        this.appContextService = appContextService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var initParams = {
            appId: '1452999264759953',
            xfbml: true,
            version: 'v2.8'
        };
        this.facebookService.init(initParams);
        this.loginWithFacebook();
    };
    LoginComponent.prototype.loginWithFacebook = function () {
        var _this = this;
        var permissions = 'email,user_birthday,user_relationships';
        this.facebookService.login({ scope: permissions })
            .then(function (response) {
            _this.appContextService.facebookId = response.authResponse.userID;
            _this.usersService.getUserByFacebook(_this.appContextService.facebookId)
                .subscribe(function (user) {
                if (user) {
                    _this.appContextService.user = user;
                    _this.router.navigateByUrl('/home');
                }
                else {
                    _this.navigateToRegister();
                }
            });
        })
            .catch(function (error) { return console.error(error); });
    };
    LoginComponent.prototype.navigateToRegister = function () {
        var _this = this;
        var requestFields = 'email,birthday,first_name,last_name,gender,relationship_status';
        this.facebookService.api("/me?fields=" + requestFields).then(function (res) {
            var birthday = _this.isFullBirthday(res.birthday) ? res.birthday : '';
            _this.appContextService.user = {
                facebookId: _this.appContextService.facebookId,
                email: res.email,
                birthday: birthday,
                firstName: res.first_name,
                lastName: res.last_name,
                gender: res.gender.charAt(0).toUpperCase() + res.gender.slice(1),
                relationshipStatus: res.relationship_status
            };
            _this.router.navigateByUrl('/register');
        });
    };
    LoginComponent.prototype.isFullBirthday = function (birthday) {
        if (!birthday) { return false; }
        return (birthday.match(/\//g) || []).length === 2;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_facebook__["b" /* FacebookService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__["a" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__["a" /* AppContextService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_app_context_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(27);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(appContextService, usersService, router, formBuiler) {
        this.appContextService = appContextService;
        this.usersService = usersService;
        this.router = router;
        this.formBuiler = formBuiler;
        Notification.requestPermission();
        this.createForm();
    }
    Object.defineProperty(RegisterComponent.prototype, "user", {
        get: function () { return this.appContextService.user; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.createUser = function (value) {
        var _this = this;
        console.log(value);
        this.user.firstName = value.firstName;
        this.user.lastName = value.lastName;
        this.user.email = value.email;
        this.user.gender = value.gender;
        if (value.birthday.indexOf('/') > -1) {
            this.user.birthday = value.birthday;
        }
        else {
            this.user.birthday = value.birthday.substring(5, 7) + "/" + value.birthday.substring(8, 10) + "/" + value.birthday.substring(0, 4);
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
            .subscribe(function (user) {
            _this.appContextService.user = user;
            _this.router.navigateByUrl('/home');
        });
    };
    RegisterComponent.prototype.createForm = function () {
        this.userForm = this.formBuiler.group({
            firstName: [this.user.firstName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            lastName: [this.user.lastName, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            email: [this.user.email, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            gender: [this.user.gender, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            birthday: [this.user.birthday, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            relationshipStatus: [this.user.relationshipStatus, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
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
    };
    RegisterComponent.prototype.getBirthdayToForm = function () {
        var birthday = this.user.birthday;
        return birthday.substring(6, 11) + "-" + birthday.substring(0, 2) + "-" + birthday.substring(3, 5);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n    <div class=\"container-fluid\">\n      <div class=\"col-md-6 col-md-offset-3\">\n        <form [formGroup]=\"userForm\" (ngSubmit)=\"createUser(userForm.value)\">\n          \n          <app-form-field [description]=\"'First Name'\">\n            <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" style=\"width:30em;\" required autofocus>\n          </app-form-field>\n\n          <app-form-field [description]=\"'Last Name'\">\n            <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" style=\"width:30em;\" required autofocus>\n          </app-form-field>\n\n          <app-form-field [description]=\"'Email'\">\n            <input type=\"email\" class=\"form-control\" formControlName=\"email\" style=\"width:30em;\" required autofocus>\n          </app-form-field>\n\n          <app-form-field [description]=\"'Gender'\">\n            <select class=\"form-control\" formControlName=\"gender\" value=\"{{user.gender}}\"style=\"width:30em\" required>\n              <option>Male</option>\n              <option>Female</option>\n            </select>\n          </app-form-field>\n\n          <app-form-field [description]=\"'Birthday'\">\n            <input type=\"date\" class=\"form-control\" formControlName=\"birthday\" value=\"{{getBirthdayToForm()}}\" \n                   style=\"width:30em;\" required autofocus>\n          </app-form-field>\n          \n          <app-form-field [description]=\"'Relationship Status'\">\n            <select class=\"form-control\" formControlName=\"relationshipStatus\" value=\"{{user.relationshipStatus}}\"\n                    style=\"width:30em\" required>\n              <option>Single</option>\n              <option>In a relationship</option>\n              <option>Engaged</option>\n              <option>Married</option>\n            </select>\n          </app-form-field>\n\n          <div class=\"page-header text-center text-primary\" style=\"margin-bottom: 0em; margin-top: 0em;\">\n            <h3>\n              I am...\n            </h3>\n          </div>\n          <ul class=\"checkbox-grid\">\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"isSoldier\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Soldier</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"isStudent\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Student</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"isRentingApartment\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Renting Apartment</div></li>\n          </ul>\n\n          <div class=\"page-header text-center text-primary\" style=\"margin-bottom: 0em; margin-top: 5em;\">\n            <h3>\n              I like...\n            </h3>\n          </div>\n          <ul class=\"checkbox-grid\">\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeSport\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Sport</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeTechnology\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Technology</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeTours\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Tours</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeCooking\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Cooking</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeMusic\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Music</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeArt\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Art</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likeFinance\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Finance</div></li>\n            <li style=\"margin-top: 1em;\"><input type=\"checkbox\" formControlName=\"likePolitics\"/>\n              <div class=\"md-chip\" style=\"margin-left: 1em\">Politics</div></li>\n          </ul>\n          \n            <div class=\"text-center\" style=\"margin-top: 7em;\">\n              <button type=\"submit\" class=\"btn btn-success\">Register</button>\n            </div>\n        </form>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_app_context_service__["a" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_app_context_service__["a" /* AppContextService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tasks_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TasksComponent = (function () {
    function TasksComponent(appContextService, tasksService) {
        this.appContextService = appContextService;
        this.tasksService = tasksService;
        this.inputFocusClass = false;
        this.remindMe = {
            date: null,
            task: null
        };
        this.newTask = {
            content: ''
        };
        this.suggestedTasks = [];
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        Notification.requestPermission();
        if (this.appContextService.validateAppInitialied()) {
            this.tasksService.getTasks().subscribe(function (tasks) { return _this.tasks = tasks; });
            setTimeout(function () {
                _this.tasksService.getSuggestedTasks().subscribe(function (suggestedTasks) {
                    _this.suggestedTasks = suggestedTasks;
                    if (_this.suggestedTasks.length > 0) {
                        if ("Notification" in window && Notification.permission === "granted") {
                            new Notification("Come check out new suggested tasks!");
                        }
                        _this.openSuggestedTasksIntroModal();
                    }
                });
            }, 10000);
        }
    };
    TasksComponent.prototype.addTask = function () {
        var _this = this;
        this.tasksService.addTask(this.newTask).subscribe(function (task) {
            _this.newTask.content = '';
            _this.tasks.push(task);
            _this.inputFocusClass = false;
        });
    };
    TasksComponent.prototype.deleteTask = function (task) {
        var _this = this;
        this.tasksService.deleteTask(task._id).subscribe(function () {
            var index = _this.tasks.indexOf(task, 0);
            if (index > -1) {
                _this.tasks.splice(index, 1);
            }
        });
    };
    TasksComponent.prototype.trackByFn = function (task) {
        return task._id;
    };
    TasksComponent.prototype.setRemindMeTask = function (task) {
        this.remindMe.task = task;
    };
    TasksComponent.prototype.setReminderClick = function () {
        if (this.remindMe.date) {
            this.remindMe.task.reminder = this.remindMe.date.toString();
            this.tasksService.updateTask(this.remindMe.task).subscribe();
        }
    };
    TasksComponent.prototype.removeReminder = function (task) {
        task.reminder = '';
        this.tasksService.updateTask(task).subscribe();
    };
    TasksComponent.prototype.openSuggestedTasksIntroModal = function () {
        $('#intro_suggested_tasks').modal();
    };
    TasksComponent.prototype.openSuggestedTasksModal = function () {
        $('#new_suggested_task').modal();
    };
    TasksComponent.prototype.passSuggestedTask = function () {
        var _this = this;
        $('#new_suggested_task').on('hidden.bs.modal', function () {
            _this.suggestedTasks.splice(0, 1);
            if (_this.suggestedTasks.length > 0) {
                _this.openSuggestedTasksModal();
            }
            else {
                $('#done_suggested_tasks').modal();
            }
            $('#new_suggested_task').off('hidden.bs.modal');
        });
        $('#new_suggested_task').modal('hide');
    };
    TasksComponent.prototype.addSuggestedTask = function () {
        var _this = this;
        this.tasksService.addTask({ content: this.suggestedTasks[0], isSuggested: true }).subscribe(function (task) {
            _this.tasks.push(task);
        });
        this.passSuggestedTask();
    };
    return TasksComponent;
}());
TasksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n    <div class=\"container\">\n      <div class=\"panel panel-default note-editor animated bounceInDown\">\n        <div class=\"panel-body\">\n          <div class=\"form-group label-floating\">\n            <textarea class=\"form-control\" #textarea autosize placeholder=\"Write a note\" [(ngModel)]=\"newTask.content\" \n                      (focus)=\"inputFocusClass = true\"></textarea>\n          </div>\n          <div class=\"form-group\" *ngIf=\"inputFocusClass\">\n            <button class=\"btn btn-primary btn-sm pull-right\" (click)=\"addTask()\">Save</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"container note grid-container animate\">\n      <div *ngFor='let task of tasks; trackBy: trackByFn' \n           class=\"panel panel-default grid-item\"\n           [ngClass]=\"{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}\"\n           #noteRow [attr.id]=\"task._id\">\n        <div data-toggle=\"modal\" data-target=\"#note_edit_modal\">\n          <div class=\"panel-body my-note module line-clamp\">\n            <p>{{task.content}}</p>\n          </div>\n        </div>\n        <div class=\"panel-footer\" [ngClass]=\"{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}\">\n          <ul class=\"note-footer\" [ngClass]=\"{'label-primary-old': !task.isSuggested, 'label-info': task.isSuggested}\">\n            <li><a data-toggle=\"modal\"\n                   data-target=\"#remind_me_modal\"\n                   (click)=\"setRemindMeTask(task)\"\n                   class=\"btn btn-link btn-raised\"\n                   title=\"Remind\">\n              <i class=\"fa fa-bell\"></i>\n            </a>\n            </li>\n            <li>\n              <a href=\"javascript:void(0)\" (click)=\"deleteTask(task)\" class=\"btn btn-link btn-raised\"\n                 title=\"Delete\">\n                <i class=\"fa fa-trash\"></i>\n              </a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"{{' reminder-info'}}\" *ngIf=\"task.reminder\">\n          <i class=\"fa fa-clock-o\"></i> {{task.reminder}}<span class=\"pull-right\">\n            <a href=\"javascript:void(0)\" (click)=\"removeReminder(task)\"><i class=\"fa fa-times-circle\">\n          </i></a></span>\n        </div>\n      </div>\n    </div>\n    \n    <!--Modals-->\n\n    <div class=\"modal fade\" id=\"remind_me_modal\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n            <h4 class=\"modal-title\">Remind Me</h4>\n          </div>\n          <div class=\"modal-body\">\n            <label><i class=\"fa fa-clock-o\"></i> Set date and time</label>\n            <div class=\"form-group\">\n              <input class=\"form-control\"\n                     readonly=\"readonly\"\n                     required\n                     placeholder=\"Set your schedule here\"\n                     [(ngModel)]=\"remindMe.date\"  \n                     ngui-datetime-picker>\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default btn-sm\" data-dismiss=\"modal\" (click)=\"remindMe.date = null\">CANCEL</button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" data-dismiss=\"modal\" (click)=\"setReminderClick()\">SET</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"intro_suggested_tasks\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n            <h4 class=\"modal-title\">New suggested tasks</h4>\n          </div>\n          <div class=\"modal-body\">\n            <div>\n              Hi {{appContextService.user.firstName}}\n            </div>\n            <div>\n              Based on your profile, we've found some tasks that might be interest to you.\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" data-dismiss=\"modal\" \n                    (click)=\"openSuggestedTasksModal()\">Let's Start</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    <div class=\"modal fade\" id=\"new_suggested_task\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n            <h4 class=\"modal-title\">New suggested task</h4>\n          </div>\n          <div class=\"modal-body\">\n            <div *ngIf=\"suggestedTasks.length > 0\">\n              {{this.suggestedTasks[0]}}\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"passSuggestedTask()\">Pass</button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addSuggestedTask()\">Add Task</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"done_suggested_tasks\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n            <h4 class=\"modal-title\">We're done</h4>\n          </div>\n          <div class=\"modal-body\">\n            <div>\n              We're glad we helped you to not forget this time.\n            </div>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__["a" /* AppContextService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_app_context_service__["a" /* AppContextService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_tasks_service__["a" /* TasksService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_tasks_service__["a" /* TasksService */]) === "function" && _b || Object])
], TasksComponent);

var _a, _b;
//# sourceMappingURL=tasks.component.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.bundle.js.map