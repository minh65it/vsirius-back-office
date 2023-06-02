import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { RoleName } from 'src/modules/_shared/_constants/role-name.enum';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;
  isProduct:boolean = false;
  listRoles: any;
  constructor(

  ) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listRoles = localStorage.getItem('ROLES');
    
    if (this.listRoles.includes(RoleName.IS_ADMIN)) {
      this.isAdmin = true;
      this.isProduct = true;
    }
    if(this.listRoles.includes(RoleName.IS_PRODUCT)){
      this.isProduct = true;
    }
  }
}
