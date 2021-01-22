import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoModel } from '../models/photo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getPhotoList(): Observable<PhotoModel[]>{
    return this.http.get<PhotoModel[]>(  `https://jsonplaceholder.typicode.com/photos`)
      .pipe(
        map( data => data.slice(0, 10)
        ));
  }
}
