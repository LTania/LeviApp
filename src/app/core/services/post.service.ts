import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {

  constructor( private http: HttpClient) { }

  getPostList(): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(  `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10`);
  }
}
