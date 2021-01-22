import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PhotoService } from '../../core/services/photo.service';
import { takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PhotoModel } from '../../core/models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  expandedElement: PhotoModel | null;
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['title', 'action'];
  activatedPhotos = [];
  activatedPhotosId = [];
  private destroy$ = new Subject();

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        },
        err => console.log(err)
      );
    this.activatedPhotos = JSON.parse(localStorage.getItem('activatedPhotos'));
    if (this.activatedPhotos){
      this.activatedPhotos.forEach(el => this.activatedPhotosId.push(el.id));
    } else {
      this.activatedPhotosId = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activatePhoto(photo): void {
    this.activatedPhotos = JSON.parse(localStorage.getItem('activatedPhotos'));
    if (this.activatedPhotos){
      this.activatedPhotos.push(photo);
      localStorage.setItem('activatedPhotos', JSON.stringify(this.activatedPhotos));
    } else {
      const photos = [];
      photos[0] = photo;
      localStorage.setItem('activatedPhotos', JSON.stringify(photos));
    }
    this.activatedPhotosId.push(photo.id);
  }

  deactivatePhoto(photo): void {
    this.activatedPhotos = JSON.parse(localStorage.getItem('activatedPhotos'));
    this.activatedPhotos = this.activatedPhotos.filter((f) => f.id !== photo.id);
    localStorage.setItem('activatedPhotos', JSON.stringify(this.activatedPhotos));
    this.activatedPhotosId = this.activatedPhotosId.filter((f) => f !== photo.id);
  }

}

