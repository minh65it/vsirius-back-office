import { Component, OnInit } from '@angular/core';
import { MenuRoles, RoleName } from 'src/modules/_shared/_constants/role-name.enum';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;
  isProduct: boolean = false;
  menu: MenuRoles = <MenuRoles>{}
  listRoles: string[];
  listOrder: string[] = ["Qgold", "Amazon", "Walmart"];
  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listRoles = JSON.parse(localStorage.getItem('ROLES'));
    const roleNameArray: string[] = Object.values(RoleName);

    this.listRoles.forEach(i => {
      roleNameArray.forEach(i2 => {
        if (i.includes(i2)) {
          this.menu[i2] = true;
        }
      });
    });

  }
  changeRoute() { }
}
