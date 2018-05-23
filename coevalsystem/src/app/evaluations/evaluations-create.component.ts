import { Component, OnInit } from '@angular/core';
import {EvaluationService} from './evaluation.service';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'evaluations-create',
  templateUrl: './evaluations-create.component.html',
  styleUrls: ['./evaluations.component.css'],
  providers: [EvaluationService]
})
export class EvaluationsCreateComponent implements OnInit 
{
  tittle = "Crear nueva Evaluación";
  form: FormGroup;

  constructor(
    private service: EvaluationService,
    private fb:FormBuilder
  ) 
  { 
    this.create();
  }

  create()
  {
    this.form = this.fb.group({
      name: ['',Validators.required],
      date: new Date(),
      tittle: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      text: ['',Validators.required]
    })
  }

  ngOnInit() 
  {
  }

  loadEvaluation()
  {
    this.service.putEvaluation(this.form.value)
    .subscribe(rt => console.log(rt),er => console.log(er),() => console.log('OK'));
  }

}