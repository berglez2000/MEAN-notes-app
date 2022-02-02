import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isAuth: boolean = false;
  isLoaded: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .authStatusListener()
      .subscribe((isAuth: boolean) => {
        this.isAuth = isAuth;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
