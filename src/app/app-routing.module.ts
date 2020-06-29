import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SensorsComponent } from './modules/sensors/sensors.component';
import { PostsComponent } from './modules/posts/posts.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sensors',
    component: SensorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articles',
    component: PostsComponent,
    canActivate: [AuthGuard]
  }]
},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
