import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PhotoService } from '../core/services/photo.service';
import { PostService } from '../core/services/post.service';
import { UserService } from '../core/services/user.service';
import { FacadeService } from '../core/services/facade.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    UserService,
    PhotoService,
    PostService
  ]
})
export class SharedModule { }
