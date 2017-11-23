import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-attract',
  templateUrl: './attract.component.html',
  styleUrls: ['./attract.component.css']
})
export class AttractComponent implements OnInit {

  constructor() {window.mixpanel.track("Attract: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight + 'px'}
}
