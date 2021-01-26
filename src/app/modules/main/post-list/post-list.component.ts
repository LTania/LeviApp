import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../core/services/post.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['title', 'body', 'action'];
  activatedPosts = [];
  activatedPostsId = [];
  private destroy$ = new Subject();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        },
        err => console.log(err)
        );
    this.activatedPosts = JSON.parse(localStorage.getItem('activatedPosts'));
    if (this.activatedPosts){
      this.activatedPosts.forEach(el => this.activatedPostsId.push(el.id));
    } else {
      this.activatedPosts = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activatePost(post): void{
    this.activatedPosts = JSON.parse(localStorage.getItem('activatedPosts'));
    if (this.activatedPosts){
      this.activatedPosts.push(post);
      localStorage.setItem('activatedPosts', JSON.stringify(this.activatedPosts));
    } else {
      const posts = [];
      posts[0] = post;
      localStorage.setItem('activatedPosts', JSON.stringify(posts));
    }
    this.activatedPostsId.push(post.id);
  }

  deactivatePost(post): void {
    this.activatedPosts = JSON.parse(localStorage.getItem('activatedPosts'));
    this.activatedPosts = this.activatedPosts.filter((f) => f.id !== post.id);
    localStorage.setItem('activatedPosts', JSON.stringify(this.activatedPosts));
    this.activatedPostsId = this.activatedPostsId.filter((f) => f !== post.id);
  }
}
