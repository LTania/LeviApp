import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {

  constructor( private http: HttpClient) { }

  getUserList(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(  `https://jsonplaceholder.typicode.com/users?_start=0&_limit=10`);
  }
}
