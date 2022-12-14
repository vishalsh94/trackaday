import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartStopSessionComponent } from './components/start-stop-session/start-stop-session.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './components/todo/todo.component';
import { ToastrModule } from 'ngx-toastr';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { RouterModule, Route } from '@angular/router';
import { PromptComponent } from './components/prompt/prompt.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AnalysisComponent } from './components/analysis/analysis.component';

const routes: Route[] = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'add', component: TodoFormComponent },
  { path: 'list', component: TodoListComponent },
  { path: 'analysis', component: AnalysisComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StartStopSessionComponent,
    TodoComponent,
    TodoFormComponent,
    TodoListComponent,
    PromptComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    // MatDialog,
    // MatDialogRef,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
