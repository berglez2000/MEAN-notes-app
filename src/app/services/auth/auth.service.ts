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
  private jwtToken: any;
  private userID: any;

  constructor(private http: HttpClient) {}

  getJWTToken(): any {
    this.jwtToken = localStorage.getItem('id_token');
    return this.jwtToken;
  }

  getUserID(): any {
    this.userID = localStorage.getItem('id_user');
    return this.userID;
  }

  isUserAuth(): boolean {
    return this.isAuth;
  }

  storeUserInformation(jwtToken: any, userID: any, email: string): void {
    localStorage.setItem('id_token', jwtToken);
    localStorage.setItem('id_user', userID);
    localStorage.setItem('email', email);
  }

  deleteUserInformation(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_user');
    localStorage.removeItem('email');
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
