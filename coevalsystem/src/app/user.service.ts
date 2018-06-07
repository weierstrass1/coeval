import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {User} from './user'


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Options } from 'selenium-webdriver/chrome';
import { Userlogin } from './userlogin';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type':'application/json'});
  private url = 'http://localhost:8000/user';
  private url2 = 'http://localhost:8000/userLast';
  private url3 = 'http://localhost:8000/userlogin';
  
  constructor(private http: Http) 
  {
    
  }

  getUserLast():Observable<number>
  {
    return this.http.get(`${this.url2}`)
    .map(r=>r.json())
    .catch(this.handleError);
  }

  getUserList():Observable<User[]>
  {
    return this.http.get(`${this.url}`)
    .map(r=>r.json())
    .catch(this.handleError);
  }

  postUserLogin(userlogin: Userlogin)
  {
    let iJson = JSON.stringify(userlogin);
    return this.http.post(`${this.url}`, iJson , {headers:this.headers})
    .map(r=>r.json())
    .catch(this.handleError);
  }

  postUser(user: User)
  {
    let iJson = JSON.stringify(user);
    return this.http.post(`${this.url}`, iJson , {headers:this.headers})
    .map(r=>r.json())
    .catch(this.handleError);
  }

  private handleError(error: Response | any)
  {
    let errMsg:string;
    if(error instanceof Response)
    {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
