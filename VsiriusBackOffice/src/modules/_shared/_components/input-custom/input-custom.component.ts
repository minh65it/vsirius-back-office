import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.css']
})
export class InputCustomComponent implements OnInit {

  @Input() model;
  @Input() label;
  constructor() { }

  ngOnInit() {
    // console.log(this.model);
  }

}
