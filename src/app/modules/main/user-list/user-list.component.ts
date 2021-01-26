import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FacadeService } from '../../../core/services/facade.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<unknown>;
  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'company', 'action'];
  activatedUsers = [];
  activatedUsersId = [];
  private destroy$ = new Subject();

  constructor(private facadeService: FacadeService) { }

  ngOnInit(): void {
    this.facadeService.getUserList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        },
        err => console.log(err)
      );
    this.activatedUsers = this.facadeService.getActivatedUserList();
    if (this.activatedUsers.length !== 0){
      this.activatedUsers.forEach(el => this.activatedUsersId.push(el.id));
    } else {
      this.activatedUsersId = [];
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  activateUser(user): void{
    this.facadeService.activateUser(user);
    this.activatedUsersId.push(user.id);
  }

  deactivateUser(user): void {
    this.facadeService.deactivateUser(user);
    this.activatedUsersId = this.activatedUsersId.filter((f) => f !== user.id);
  }
}


