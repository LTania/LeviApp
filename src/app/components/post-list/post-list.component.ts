import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../core/services/post.service';
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activatePost(post): void{
    console.log(post);
  }
}
