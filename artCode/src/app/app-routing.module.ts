import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent}      from './pages/home/home.component';
import {PointPathComponent}      from './pages/point_path/point_path.component';
import {TangleComponent}      from './pages/tangle/tangle.component';
import {AttractComponent}      from './pages/attract/attract.component';
import {WallComponent}      from './pages/wall/wall.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'point_path', component: PointPathComponent},
  {path: 'tangle', component: TangleComponent},
  {path: 'attract', component: AttractComponent},
  {path: 'wall', component: WallComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
