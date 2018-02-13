import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {WindowRef} from './providers/window';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './pages/home/home.component';
import {AttractComponent} from './pages/attract/attract.component';
import {PointPathComponent} from './pages/point_path/point_path.component';
import {TangleComponent} from './pages/tangle/tangle.component';
import {WallComponent} from './pages/wall/wall.component';
import {LinkComponent} from './pages/link/link.component';
import {BounceComponent} from './pages/bounce/bounce.component';
import {PulseComponent} from './pages/pulse/pulse.component';
import {SquareComponent} from './pages/square/square.component';
import {StackComponent} from './pages/stack/component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AttractComponent, PointPathComponent, StackComponent,
    TangleComponent, WallComponent, LinkComponent, BounceComponent, PulseComponent, SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
