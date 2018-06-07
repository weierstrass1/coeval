import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MyaccountComponent} from './myaccount/myaccount.component';
import {UsersComponent} from './users/users.component';
import {EvaluationsComponent} from './evaluations/evaluations.component';
import { MyaccountDataComponent } from './myaccount/myaccount-data.component';
import { MyaccountLoginComponent } from './myaccount/myaccount-login.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersListComponent } from './users/users-list.component';
import { UsersElementComponent } from './users/users-element.component';
import { EvaluationsCreateComponent } from './evaluations/evaluations-create.component';
import { EvaluationsListComponent } from './evaluations/evaluations-list.component';
import { EvaluationsElementComponent } from './evaluations/evaluations-element.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

const appRoutes: Routes = [
    {path: 'myaccount', component: MyaccountComponent,
    children: [
        {path: '', redirectTo: 'data', pathMatch:'full'},
        {path: 'data', component: MyaccountDataComponent},
        {path: 'login', component: MyaccountLoginComponent}
    ]},
    {path: 'users', component: UsersComponent,
    children: [
        {path: '', redirectTo: 'list', pathMatch:'full'},
        {path: 'create', component: UsersCreateComponent},
        {path: 'list', component: UsersListComponent},
        {path: 'list/:pag', component: UsersListComponent},
        {path: 'element/:id', component: UsersElementComponent}
    ]},
    {path: 'evaluations', component: EvaluationsComponent,
    children: [
        {path: '', redirectTo: 'list', pathMatch:'full'},
        {path: 'create', component: EvaluationsCreateComponent},
        {path: 'create/step2', component: Step2Component},
        {path: 'create/step3', component: Step3Component},
        {path: 'list', component: EvaluationsListComponent},
        {path: 'list/:pag', component: EvaluationsListComponent},
        {path: 'element/:id', component: EvaluationsElementComponent}
    ]}
];

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule{}

