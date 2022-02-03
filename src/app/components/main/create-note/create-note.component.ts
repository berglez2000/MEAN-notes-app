import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { Note } from 'src/app/models/Note';
import { ServerResponse } from 'src/app/models/ServerResponse';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent implements OnInit {
  noteText: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private alertService: AlertService,
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.noteText) {
      const alert: Alert = this.alertService.createAlert(
        'warning',
        'Please enter a note',
        1500
      );
      this.alertService.addAlert(alert);

      return;
    }

    const note: Note = {
      note: this.noteText,
      creator: this.authService.getUserID(),
    };

    this.subscription = this.notesService.addNote(note).subscribe(
      (res: ServerResponse) => {
        const success: boolean = res.success;
        if (success) {
          const alert: Alert = this.alertService.createAlert(
            'success',
            'Note created successfully',
            1500
          );
          this.alertService.addAlert(alert);

          return;
        }

        const alert: Alert = this.alertService.createAlert(
          'warning',
          res.msg,
          1500
        );
        this.alertService.addAlert(alert);
      },
      (error) => {
        const alert: Alert = this.alertService.createAlert(
          'danger',
          'An error has occurred',
          1500
        );
        this.alertService.addAlert(alert);
      }
    );
  }
}
