import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'evaluations-element',
  templateUrl: './evaluations-element.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsElementComponent implements OnInit {

  constructor
  (
    private route: ActivatedRoute,
    private router: Router
  ) 
  {
  }

  ngOnInit() 
  {
    let id = this.route.snapshot.params['id'];

    if(!id)return;

    console.log(id);
  }

}
