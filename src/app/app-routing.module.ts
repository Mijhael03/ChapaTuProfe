import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './presentation/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./presentation/pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'qualifying', canActivate: [AuthGuard], loadChildren: () => import('./presentation/pages/session/qualifying/qualifying.module').then(m => m.QualifyingModule) },
  { path: 'maintenance', canActivate: [AuthGuard], loadChildren: () => import('./presentation/pages/session/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
