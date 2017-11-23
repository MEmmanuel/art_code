import {WindowRef} from '../../providers/window';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  constructor(private window: WindowRef) {this.window.nativeWindow.mixpanel.track("Link: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight - 50 + 'px'}
}
