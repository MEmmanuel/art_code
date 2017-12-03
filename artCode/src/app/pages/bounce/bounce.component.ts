import {WindowRef} from '../../providers/window';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bounce',
  templateUrl: './bounce.component.html',
  styleUrls: ['./bounce.component.css']
})
export class BounceComponent implements OnInit {

  constructor(private window: WindowRef) {this.window.nativeWindow.mixpanel.track("Bounce: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight - 50 + 'px'}
}
