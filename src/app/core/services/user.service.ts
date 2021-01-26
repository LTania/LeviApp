import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
  activatedUserList: UserModel[] = [] ;
  constructor( private http: HttpClient) { }

  getUserList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(  `https://jsonplaceholder.typicode.com/users?_start=0&_limit=10`);
  }

  activateUser(user: UserModel): void {
    this.activatedUserList.push(user);
  }

  deactivateUser(user: UserModel): void {
    this.activatedUserList = this.activatedUserList.filter((f) => f.id !== user.id);
  }

  getActivatedUserList(): UserModel[] {
    return this.activatedUserList;
  }
}
