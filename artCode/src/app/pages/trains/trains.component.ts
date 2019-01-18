import {WindowRef} from '../../providers/window';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-train',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent implements OnInit {

  constructor(private window: WindowRef) {this.window.nativeWindow.mixpanel.track("Trains: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight - 50 + 'px'}
}
