import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {EvaluationService} from './evaluation.service';
import {Evaluation} from './evaluation';

@Component({
  selector: 'evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations.component.css'],
})
export class EvaluationsListComponent implements OnInit {

  list: Evaluation[];

  constructor
  (
    private service: EvaluationService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  {
  }

  ngOnInit() 
  {
    this.service.getEvaluationList().subscribe(rs=>this.list=rs,
      er =>console.log(er),
      ()=>console.log(this.list))
    let pag = this.route.snapshot.params['pag'];

    if(!pag)return;

    console.log(pag);
  }

}
