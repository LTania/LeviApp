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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activatePhoto(photo): void {
    console.log(photo);
  }

}

