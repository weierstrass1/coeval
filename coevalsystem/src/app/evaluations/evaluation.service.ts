import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Evaluation} from './evaluation';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Options } from 'selenium-webdriver/chrome';

@Injectable()
export class EvaluationService {

  private headers = new Headers({'Content-Type':'application/json'});
  private url = 'http://localhost:8000/evaluation';
  
  constructor(private http: Http) 
  {

  }

  getEvaluationList():Observable<Evaluation[]>
  {
    return this.http.get(`${this.url}`)
    .map(r=>r.json())
    .catch(this.handleError);
  }

  putEvaluation(evaluation: Evaluation)
  {
    let iJson = JSON.stringify(evaluation);
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
