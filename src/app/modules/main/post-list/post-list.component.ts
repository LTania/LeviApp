import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FacadeService } from '../../../core/services/facade.service';

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

  constructor(private facadeService: FacadeService) { }

  ngOnInit(): void {
    this.facadeService.getPostList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        },
        err => console.log(err)
        );
    this.activatedPosts = this.facadeService.getActivatedPostList();
    if (this.activatedPosts.length !== 0){
      this.activatedPosts.forEach(el => this.activatedPostsId.push(el.id));
    } else {
      this.activatedPostsId = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activatePost(post): void{
    this.facadeService.activatePost(post);
    this.activatedPostsId.push(post.id);
  }

  deactivatePost(post): void {
    this.facadeService.deactivatePost(post);
    this.activatedPostsId = this.activatedPostsId.filter((f) => f !== post.id);
  }
}
