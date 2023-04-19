import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public message(message: string): void {
    if (!message) {
      return;
    }

    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['message-snackbar'],
    });
  }

  public destroy(): void {
    this.snackBar.ngOnDestroy();
  }
}
