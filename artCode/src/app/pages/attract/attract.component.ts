import {WindowRef} from '../../providers/window';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attract',
  templateUrl: './attract.component.html',
  styleUrls: ['./attract.component.css']
})
export class AttractComponent implements OnInit {

  constructor(private window: WindowRef) {this.window.nativeWindow.mixpanel.track("Attract: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight - 50 + 'px'}
}
