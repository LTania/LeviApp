import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then(m => m.MainModule)
  },
  { path: 'activated',
    loadChildren: () =>
      import('./modules/activated/activated.module').then(m => m.ActivatedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
