import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersCreateComponent implements OnInit {
  tittle = "Crear nueva Evaluación";
  form1: FormGroup;
  form2: FormGroup;
  a : number;

  constructor(
    private service: UserService,
    private fb:FormBuilder
  ) 
  { 
    this.create();
  }
  
  create()
  {
    this.form1 = this.fb.group({
      first_name: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      last_name: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      gender: ['',Validators.required],
      career: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])]
    });

    this.form2 = this.fb.group({
      user_id: 1,
      username: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      password: "1234"
    });
  }

  ngOnInit() {
  }

  loadLogin()
  {
    this.form2.setValue({user_id:this.a});

    this.service.postUserLogin(this.form2.value)
    .subscribe(rt => console.log(rt),er => console.log(er),() => console.log('OK'));
  }

  loadUser()
  {
    this.service.postUser(this.form1.value)
    .subscribe(rt => console.log(rt),er => console.log(er),
    () => this.service.getUserLast().subscribe(rs=>this.a=rs,
      er =>console.log(er),
      ()=>this.loadLogin()));
  }

}
