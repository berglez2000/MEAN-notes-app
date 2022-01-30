import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  userID: any;
  jwtToken: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userID = this.authService.getUserID();
    this.jwtToken = this.authService.getJWTToken();

    if (this.userID && this.jwtToken) {
      this.authService.getIsAuth(this.jwtToken);
    }
  }
}
