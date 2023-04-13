import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  @Input() visible=false;
  @Input() notfoundmessage="Nothing Found";
  @Input() resetLinkText="Reset";
  @Input() resetLinkroute="/";
  constructor() { }

  ngOnInit(): void {
  }

}
