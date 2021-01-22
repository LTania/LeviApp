import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, OnDestroy{
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company', 'action'];
  private destroy$ = new Subject();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserList()
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

  activateUser(user): void{
    console.log(user);
  }
}


