import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth!: boolean;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .authStatusListener()
      .subscribe((isAuth: boolean) => {
        this.isAuth = isAuth;
      });
  }

  onLogoutClick(): void {
    this.loginService.onLogout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
