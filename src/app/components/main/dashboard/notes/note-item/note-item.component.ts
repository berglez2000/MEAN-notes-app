import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ServerResponse } from 'src/app/models/ServerResponse';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() note!: Note;
  faTimes = faTimes;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {}

  onDelete(): void {
    this.notesService
      .deleteNote(this.note._id)
      .subscribe((res: ServerResponse) => {
        console.log(res);
      });
  }
}
