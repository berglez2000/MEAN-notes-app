import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/main/forms/login/login.component';
import { RegisterComponent } from './components/main/forms/register/register.component';
import { AlertComponent } from './components/global/alert/alert.component';
import { NotesComponent } from './components/main/dashboard/notes/notes.component';
import { SpinnerComponent } from './components/global/spinner/spinner.component';
import { NoteItemComponent } from './components/main/dashboard/notes/note-item/note-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateNoteComponent } from './components/main/create-note/create-note.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    NotesComponent,
    SpinnerComponent,
    NoteItemComponent,
    CreateNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
