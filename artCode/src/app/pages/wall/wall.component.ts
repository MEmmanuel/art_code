import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  constructor() {}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight + 'px'}
}
