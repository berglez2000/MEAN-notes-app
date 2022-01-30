import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { Observable, Subject } from 'rxjs';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:5000/api/users/';
  private isAuth: boolean = false;
  private authStatus = new Subject<boolean>();
  private jtwToken: any;
  private userID: any;

  constructor(private http: HttpClient) {}

  getJWTToken(): any {
    this.jtwToken = localStorage.getItem('id_token');
    return this.jtwToken;
  }

  getUserID(): any {
    this.userID = localStorage.getItem('id_user');
    return this.userID;
  }

  changeAuth(isAuth: boolean): void {
    this.isAuth = isAuth;
    this.authStatus.next(this.isAuth);
  }

  authStatusListener(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getIsAuth(jwtToken: string): void {
    const url: string = this.apiUrl + 'validate';
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${jwtToken}`
    );
    this.http.get<ServerResponse>(url, httpOptions).subscribe(
      (res: ServerResponse) => {
        if (res.success) {
          this.changeAuth(true);
        }
      },
      (error: HttpErrorResponse) => {
        this.changeAuth(false);
      }
    );
  }
}
