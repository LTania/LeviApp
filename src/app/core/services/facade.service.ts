import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';
import { PhotoService } from './photo.service';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { PhotoModel } from '../models/photo.model';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private usService: UserService;
  public get userService(): UserService {
    if (!this.usService){
      this.usService = this.injector.get(UserService);
    }
    return this.usService;
  }

  private phService: PhotoService;
  public get photoService(): PhotoService {
    if (!this.phService){
      this.phService = this.injector.get(PhotoService);
    }
    return this.phService;
  }

  private pService: PostService;
  public get postService(): PostService {
    if (!this.pService){
      this.pService = this.injector.get(PostService);
    }
    return this.pService;
  }

  constructor(private injector: Injector) { }

  getUserList(): Observable<UserModel[]> {
    return this.userService.getUserList();
  }

  activateUser(user: UserModel): void {
    return this.userService.activateUser(user);
  }

  deactivateUser(user: UserModel): void {
    return this.userService.deactivateUser(user);
  }

  getActivatedUserList(): UserModel[] {
    return this.userService.getActivatedUserList();
  }

  getPhotoList(): Observable<PhotoModel[]> {
    return this.photoService.getPhotoList();
  }

  activatePhoto(photo: PhotoModel): void {
    return this.photoService.activatePhoto(photo);
  }

  deactivatePhoto(photo: PhotoModel): void {
    return this.photoService.deactivatePhoto(photo);
  }

  getActivatedPhotoList(): PhotoModel[] {
    return this.photoService.getActivatedPhotoList();
  }

  getPostList(): Observable<PostModel[]> {
    return this.postService.getPostList();
  }

  activatePost(post: PostModel): void {
    return this.postService.activatePost(post);
  }

  deactivatePost(post: PostModel): void {
    return this.postService.deactivatePost(post);
  }

  getActivatedPostList(): PostModel[] {
    return this.postService.getActivatedPostList();
  }
}
