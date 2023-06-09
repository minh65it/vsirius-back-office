import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InitJsUtility } from '../../_helpers/int-js-utility';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit {

  constructor(
    private initJsUtility: InitJsUtility
  ) { }
  
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.initJsUtility.toggleNav();
  }

}
