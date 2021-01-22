import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { ActivatedListComponent } from './components/activated-list/activated-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'photos', component: PhotoListComponent},
  {path: 'activated', component: ActivatedListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
