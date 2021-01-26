import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PhotoModel } from '../../../core/models/photo.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FacadeService } from '../../../core/services/facade.service';

@Component({
  selector: 'app-activated-list',
  templateUrl: './activated-list.component.html',
  styleUrls: ['./activated-list.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActivatedListComponent implements OnInit {
  isPhotos: boolean;
  isUsers: boolean;
  isPosts: boolean;
  postsSource: MatTableDataSource<unknown>;
  postsDisplayedColumns: string[] = ['title', 'body'];
  usersSource: MatTableDataSource<unknown>;
  usersDisplayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company'];
  photosSource: MatTableDataSource<unknown>;
  photosDisplayedColumns: string[] = ['title'];
  expandedPhotoElement: PhotoModel | null;

  constructor(private facadeService: FacadeService) { }

  ngOnInit(): void {
    const posts = this.facadeService.getActivatedPostList();
    if (posts && posts.length !== 0){
      this.postsSource = new MatTableDataSource(posts);
      this.isPosts = true;
    }
    else {
      this.isPosts = false;
    }

    const photos = this.facadeService.getActivatedPhotoList();
    if (photos && photos.length !== 0){
      this.photosSource = new MatTableDataSource(photos);
      this.isPhotos = true;
    }
    else {
      this.isPhotos = false;
    }

    const users = this.facadeService.getActivatedUserList();
    if (users && users.length !== 0){
      this.usersSource = new MatTableDataSource(users);
      this.isUsers = true;
    }
    else {
      this.isUsers = false;
    }
  }

}
