import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isAuth: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private alertService: AlertService,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .authStatusListener()
      .subscribe((isAuth: boolean) => {
        this.isAuth = isAuth;

        /* if (this.isAuth) {
          const alert: Alert = this.alertService.createAlert(
            'info',
            'You are already logged in',
            999999999999
          );

          this.alertService.addAlert(alert);
        } */
      });
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      const alert: Alert = this.alertService.createAlert(
        'warning',
        'Please enter all fields',
        2000
      );
      this.alertService.addAlert(alert);
      return;
    }

    const user: User = {
      email: this.email,
      password: this.password,
    };

    this.loginService.onLogin(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
