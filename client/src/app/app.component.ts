import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="page-header text-center text-primary">
      <h2>
        Don't Forget
      </h2>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
