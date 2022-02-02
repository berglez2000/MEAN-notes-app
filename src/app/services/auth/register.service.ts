import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from '../alert/alert.service';
import { Alert } from 'src/app/models/Alert';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl: string = 'http://localhost:5000/api/users/register';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  onRegister(user: User): void {
    this.http.post<ServerResponse>(this.apiUrl, user, httpOptions).subscribe(
      (res: ServerResponse) => {
        console.log(res);
        let alert: Alert;
        if (res.success) {
          alert = this.alertService.createAlert(
            'success',
            'User registered',
            1500
          );

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          alert = this.alertService.createAlert(
            'danger',
            'User registration failed',
            1500
          );
        }

        this.alertService.addAlert(alert);
      },
      (error: HttpErrorResponse) => {
        const alert: Alert = this.alertService.createAlert(
          'danger',
          error.message,
          1500
        );
        this.alertService.addAlert(alert);
      }
    );
  }
}
