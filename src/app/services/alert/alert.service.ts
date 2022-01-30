import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/models/Alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<Alert>();

  constructor() {}

  createAlert(color: string, alertText: string, time: number): Alert {
    const alert: Alert = {
      color: color,
      alertText: alertText,
      time: time,
    };

    return alert;
  }

  addAlert(alert: Alert): void {
    this.alertSubject.next(alert);
  }

  onAddAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }
}
