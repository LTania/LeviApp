import { Injectable, Injector } from '@angular/core';
import { UserService } from './user.service';
import { PhotoService } from './photo.service';
import { PostService } from './post.service';

@Injectable()
export class FacadeService {
  private usService: UserService;
  public get userService(): UserService{
    if (!this.usService){
      this.usService = this.injector.get(UserService);
    }
    return this.usService;
  }

  private phService: PhotoService;
  public get photoService(): PhotoService{
    if (!this.phService){
      this.phService = this.injector.get(PhotoService);
    }
    return this.phService;
  }

  private pService: PostService;
  public get postService(): PostService{
    if (!this.pService){
      this.pService = this.injector.get(PostService);
    }
    return this.pService;
  }

  constructor(private injector: Injector) { }

  getUserList(){
    return this.userService.getUserList();
  }

  getPhotoList(){
    return this.photoService.getPhotoList();
  }

  getPostList(){
    return this.postService.getPostList();
  }
}
