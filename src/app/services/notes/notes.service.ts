import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from 'src/app/models/Note';
import { ServerResponse } from 'src/app/models/ServerResponse';
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
  private noteSubject = new Subject<any>();

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

  addNote(note: Note): Observable<ServerResponse> {
    if (!this.token) {
      this.token = this.authService.getJWTToken();
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.token}`
      );
    }
    return this.http.post<ServerResponse>(this.apiUrl, note, httpOptions);
  }

  deleteNote(id: any): Observable<ServerResponse> {
    this.noteSubject.next(id);
    const url: string = this.apiUrl + id;
    if (!this.token) {
      this.token = this.authService.getJWTToken();
      httpOptions.headers = httpOptions.headers.append(
        'Authorization',
        `Bearer ${this.token}`
      );
    }
    return this.http.delete<ServerResponse>(url, httpOptions);
  }

  onDeleteNote(): Observable<any> {
    return this.noteSubject.asObservable();
  }
}
