import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './components/main/create-note/create-note.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { LoginComponent } from './components/main/forms/login/login.component';
import { RegisterComponent } from './components/main/forms/register/register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create-note', component: CreateNoteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
