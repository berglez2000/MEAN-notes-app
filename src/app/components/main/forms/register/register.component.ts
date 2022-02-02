import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert/alert.service';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    private registerService: RegisterService,
    private alertService: AlertService
  ) {}

  createUser(): User {
    const user: User = {
      email: this.email,
      password: this.password,
    };

    return user;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.email || !this.password || !this.repeatPassword) {
      const alert: Alert = this.alertService.createAlert(
        'danger',
        'Please enter all fields',
        3000
      );
      this.alertService.addAlert(alert);
      return;
    }

    if (this.password !== this.repeatPassword) {
      const alert: Alert = this.alertService.createAlert(
        'danger',
        "Passwords don't match",
        3000
      );
      this.alertService.addAlert(alert);
      return;
    }

    const user: User = this.createUser();

    this.registerService.onRegister(user);

    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }
}
