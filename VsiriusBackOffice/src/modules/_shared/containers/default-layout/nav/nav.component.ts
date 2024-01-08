import { Component, OnInit } from '@angular/core';
import { MenuRoles, RoleName } from 'src/modules/_shared/_constants/role-name.enum';
import { Order } from 'src/modules/_shared/_helpers/params/order-param';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menu: MenuRoles = <MenuRoles>{}
  listRoles: string[];
  listOrder: Order[] = [
    {
      title: 'Qgold',
      url: '/orders-processor/Qgold',
      icon: 'fa-shopping-cart'
    },
    {
      title: 'Vsirius',
      url: '/orders',
    },
    {
      title: 'Amazon',
      url: '/orders-processor/Amazon',
    },
    {
      title: 'Walmart',
      url: '/orders-processor/Walmart',
    },
    {
      title: 'Amazon Return',
      url: '/return-orders/Amazon',
    },
    {
      title: 'Walmart Return',
      url: '/return-orders/Walmart',
    },
    {
      title: 'Package-Claim',
      url: '/return-orders/Package-Claim',
    },
  ];
  visible = false;
  visible2 = false;
  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.listRoles = JSON.parse(localStorage.getItem('ROLES'));
    const roleNameArray: string[] = Object.values(RoleName);

    this.listRoles?.forEach(i => {
      roleNameArray.forEach(i2 => {
        if (i.includes(i2)) {
          this.menu[i2] = true;
        }
      });
    });

  }
  changeRoute() { }
  toggleCollapse(id: string): void {
    switch (id) {
      case 'order-processor': {
        this.visible = !this.visible;
        break;
      }
      case 'return-orders': {
        this.visible2 = !this.visible2;
        break;
      }
    }
  }
}
