import { Routes } from '@angular/router';
import { ViewHomeComponent } from './view/view-home/view-home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ViewHomeComponent },
  {
    path: 'lazy',
    loadChildren: () =>
      import('./navigation/navigation.module').then((m) => m.NavigationModule),
  },
];
