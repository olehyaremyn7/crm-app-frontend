import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<mat-spinner diameter="70"></mat-spinner>`,
  styles: [
    `
      mat-spinner {
        position: absolute;
        left: 48%;
        top: 46%;
        right: 0;
      }
    `,
  ],
})
export class LoaderComponent {}
