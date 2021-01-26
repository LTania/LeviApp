import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {
  activatedPostList: PostModel[] = [];
  constructor( private http: HttpClient) { }

  getPostList(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(  `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10`);
  }

  activatePost(post: PostModel): void {
    this.activatedPostList.push(post);
  }

  deactivatePost(post: PostModel): void {
    this.activatedPostList = this.activatedPostList.filter((f) => f.id !== post.id);
  }

  getActivatedPostList(): PostModel[] {
    return this.activatedPostList;
  }
}
