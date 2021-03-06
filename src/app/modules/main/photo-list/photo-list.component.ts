import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PhotoModel } from '../../../core/models/photo.model';
import { FacadeService } from '../../../core/services/facade.service';

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

  constructor(private facadeService: FacadeService) {}

  ngOnInit(): void {
    this.facadeService.getPhotoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        },
        err => console.log(err)
      );
    this.activatedPhotos = this.facadeService.getActivatedPhotoList();
    if (this.activatedPhotos.length !== 0){
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
    this.facadeService.activatePhoto(photo);
    this.activatedPhotosId.push(photo.id);
  }

  deactivatePhoto(photo): void {
    this.facadeService.deactivatePhoto(photo);
    this.activatedPhotosId = this.activatedPhotosId.filter((f) => f !== photo.id);
  }
}

