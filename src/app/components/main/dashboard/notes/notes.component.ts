import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  isLoaded: boolean = false;
  userId: any;

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserID();
    this.notesService.getNotes(this.userId).subscribe((notes: Note[]) => {
      this.notes = notes;
      this.isLoaded = true;
    });
  }
}
