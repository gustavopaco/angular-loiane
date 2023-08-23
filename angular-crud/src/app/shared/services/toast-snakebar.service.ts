import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastSnakebarService {
  panelClass: string[] = ['toast-success'];
  action = 'Fechar';
  durationInSeconds = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snakeBar: MatSnackBar) {
  }

  success(message: string, action?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.panelClass = ['success'];
    this.configureSnakeBar(action, duration, horizontalPosition, verticalPosition);
    this.openSnackBar(message);
  }

  error(message: string, action?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.panelClass = ['error'];
    this.configureSnakeBar(action, duration, horizontalPosition, verticalPosition);
    this.openSnackBar(message);
  }

  warning(message: string, action?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.panelClass = ['warning'];
    this.configureSnakeBar(action, duration, horizontalPosition, verticalPosition);
    this.openSnackBar(message);
  }

  configureSnakeBar(action?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.action = action ? action : this.action;
    this.durationInSeconds = duration ? duration : this.durationInSeconds;
    this.horizontalPosition = horizontalPosition ? horizontalPosition : this.horizontalPosition;
    this.verticalPosition = verticalPosition ? verticalPosition : this.verticalPosition;
  }

  openSnackBar(message: string) {
    this.snakeBar.open('Falhou', this.action, {
      duration: this.durationInSeconds,
      panelClass: this.panelClass,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
