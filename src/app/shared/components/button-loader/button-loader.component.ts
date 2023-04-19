import { Component } from '@angular/core';

@Component({
  selector: 'app-button-loader',
  template: `<mat-spinner diameter="30"></mat-spinner>`,
  styles: [
    `
      mat-spinner {
        left: calc(50% - 12px);
      }
    `,
  ],
})
export class ButtonLoaderComponent {}
