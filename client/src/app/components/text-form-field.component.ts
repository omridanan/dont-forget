import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-field',
  template: `    
    <div class="row">
      <div class="col-md-3" style="text-align: right; padding-top: .7rem;">
        <label>{{description}}</label>
      </div>
      <div class="col-md-9">
        <div class="form-group">
          <div class="input-group">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FormFieldComponent {
  @Input() description: string;
}
