import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-users-element',
  templateUrl: './users-element.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersElementComponent implements OnInit {

  constructor(
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
