import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-point-path',
  templateUrl: './point_path.component.html',
  styleUrls: ['./point_path.component.css']
})
export class PointPathComponent implements OnInit {

  constructor() {window.mixpanel.track("Point_path: Page start")}

  ngOnInit() {document.getElementsByTagName('iframe')[0].style.height = window.innerHeight + 'px'}
}
