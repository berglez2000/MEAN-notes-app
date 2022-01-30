import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  color: string = '';
  alertText: string = '';
  showAlert: boolean = false;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService
      .onAddAlert()
      .subscribe((alert: Alert) => {
        this.color = alert.color;
        this.alertText = alert.alertText;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, alert.time);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
