import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersListComponent implements OnInit {

  list: User[];

  constructor
  (
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) 
  {
  }

  ngOnInit() 
  {
    this.service.getUserList().subscribe(rs=>this.list=rs,
      er =>console.log(er),
      ()=>console.log(this.list))
    let pag = this.route.snapshot.params['pag'];

    if(!pag)return;

    console.log(pag);
  }

}
