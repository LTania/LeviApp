import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private http: HttpClient) { }

  getPostList(): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(  `https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map( data => data.slice(0, 10)
      ));
  }
}
