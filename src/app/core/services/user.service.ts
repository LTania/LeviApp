import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

  getUserList(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(  `https://jsonplaceholder.typicode.com/users`)
      .pipe(
        map( data => data.slice(0, 10)
        ));
  }
}
