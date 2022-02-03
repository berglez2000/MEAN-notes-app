import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/models/Note';
import { AuthService } from '../auth/auth.service';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl: string = 'http://localhost:5000/api/notes/';
  private token: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getNotes(userId: any): Observable<Note[]> {
    const url: string = this.apiUrl + userId;
    if (!this.token) {
      this.token = this.authService.getJWTToken();
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.token}`
      );
    }
    return this.http.get<Note[]>(url, httpOptions);
  }
}
