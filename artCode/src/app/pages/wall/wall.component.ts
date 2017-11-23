import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  constructor() {window.mixpanel.track("Wall: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight + 'px'}
}
