import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      title: 'Supplier',
      icon: 'fa-shopping-cart',
      visible: false,
      items: [
        {
          title: 'Qgold',
          url: '/orders-processor/Qgold',
        },
        {
          title: 'Stuller',
          url: '/orders-processor/Stuller',
        },
      ]
    },
    {
      title: 'Marketplace',
      icon: 'fa-shopping-cart',
      visible: false,
      items: [
        {
          title: 'VSirius',
          url: '/orders/orders-vsirius',
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
      ]
    },
    {
      title: 'Package-Claim',
      url: '/return-orders/Package-Claim',
      icon: 'fa-shopping-cart',
      items: null
    },
  ];
  visible = false;
  constructor(
    private router: Router,
  ) { }

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
    }
  }
  toggleCollapseOrder(menuOrder: Order) {
    this.listOrder = this.listOrder.map(elm => {
      if (elm.title === menuOrder.title) {
        return {
          ...elm, visible: !elm.visible
        }
      } else {
        return {
          ...elm
        }
      }
    });
    if (menuOrder.url !== '' || menuOrder.url !== null) {
      this.router.navigate([menuOrder.url]);
    }
  }
}
