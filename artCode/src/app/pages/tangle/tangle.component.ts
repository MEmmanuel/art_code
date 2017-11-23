import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tangle',
  templateUrl: './tangle.component.html',
  styleUrls: ['./tangle.component.css']
})
export class TangleComponent implements OnInit {

  constructor() {window.mixpanel.track("Tangle: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight + 'px'}
}
