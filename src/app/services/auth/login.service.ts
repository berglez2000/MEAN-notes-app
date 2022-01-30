import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AuthService } from './auth.service';
import { AlertService } from '../alert/alert.service';
import { Alert } from 'src/app/models/Alert';
import { Router } from '@angular/router';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = 'http://localhost:5000/api/users/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onLogin(user: User): void {
    const url: string = this.apiUrl + 'login';
    this.http
      .post<ServerResponse>(url, user, httpOptions)
      .subscribe((res: ServerResponse) => {
        if (res.success) {
          const alert: Alert = this.alertService.createAlert(
            'success',
            'Login Succesfull',
            1000
          );

          this.authService.storeUserInformation(
            res.jwt,
            res.user?._id,
            res.user!.email
          );

          this.alertService.addAlert(alert);

          setTimeout(() => {
            this.authService.changeAuth(true);
            this.router.navigate(['/']);
          }, 1000);
        }
      });
  }
}
