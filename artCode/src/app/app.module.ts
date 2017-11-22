import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {AttractComponent} from './pages/attract/attract.component';
import {PointPathComponent} from './pages/point_path/point_path.component';
import {TangleComponent} from './pages/tangle/tangle.component';
import {WallComponent} from './pages/wall/wall.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AttractComponent, PointPathComponent, TangleComponent, WallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
