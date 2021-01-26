import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoModel } from '../models/photo.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoService {
  activatedPhotoList: PhotoModel[] = [];
  constructor(private http: HttpClient) { }

  getPhotoList(): Observable<PhotoModel[]> {
    return this.http.get<PhotoModel[]>(  `https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10`);
  }

  activatePhoto(photo: PhotoModel): void {
    this.activatedPhotoList.push(photo);
  }

  deactivatePhoto(photo: PhotoModel): void {
    this.activatedPhotoList = this.activatedPhotoList.filter((f) => f.id !== photo.id);
  }

  getActivatedPhotoList(): PhotoModel[] {
    return this.activatedPhotoList;
  }
}
