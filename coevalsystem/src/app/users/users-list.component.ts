import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersListComponent implements OnInit {

  constructor
  (
    private route: ActivatedRoute,
    private router: Router
  ) 
  {
  }

  ngOnInit() 
  {
    let pag = this.route.snapshot.params['pag'];

    if(!pag)return;

    console.log(pag);
  }

}
