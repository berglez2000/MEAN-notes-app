import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() note!: Note;
  faTimes = faTimes;

  constructor() {}

  ngOnInit(): void {}

  onDelete(): void {
    console.log(this.note);
  }
}
