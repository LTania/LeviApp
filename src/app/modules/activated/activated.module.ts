import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedListComponent } from './activated-list/activated-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ActivatedListComponent }
];

@NgModule({
  declarations: [
    ActivatedListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivatedModule { }
