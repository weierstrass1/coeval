import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { UsersComponent } from './users/users.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { MyaccountDataComponent } from './myaccount/myaccount-data.component';
import { MyaccountLoginComponent } from './myaccount/myaccount-login.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersListComponent } from './users/users-list.component';
import { UsersElementComponent } from './users/users-element.component';
import { EvaluationsCreateComponent } from './evaluations/evaluations-create.component';
import { EvaluationsListComponent } from './evaluations/evaluations-list.component';
import { EvaluationsElementComponent } from './evaluations/evaluations-element.component';
import {EvaluationService} from './evaluations/evaluation.service';

@NgModule({
  declarations: [
    AppComponent,
    MyaccountComponent,
    UsersComponent,
    EvaluationsComponent,
    MyaccountDataComponent,
    MyaccountLoginComponent,
    UsersCreateComponent,
    UsersListComponent,
    UsersElementComponent,
    EvaluationsCreateComponent,
    EvaluationsListComponent,
    EvaluationsElementComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [EvaluationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
