import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/models/Note';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  isLoaded: boolean = false;
  userId: any;
  private subscription: Subscription = new Subscription();

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserID();
    this.subscription = this.notesService
      .getNotes(this.userId)
      .subscribe((notes: Note[]) => {
        this.notes = notes;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
