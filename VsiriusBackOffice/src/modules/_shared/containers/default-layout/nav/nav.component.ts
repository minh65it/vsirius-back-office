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
      url: null,
      icon: 'fa-shopping-cart',
      visible: false,
      items: [
        {
          title: 'Qgold',
          url: '/orders/supplier/qgold',
        },
        {
          title: 'Stuller',
          url: '/orders/supplier/stuller',
        },
      ]
    },
    {
      title: 'Marketplace',
      url: null,
      icon: 'fa-shopping-cart',
      visible: false,
      items: [
        {
          title: 'Vsirius',
          url: '/orders/marketplace/vsirius',
        },
        {
          title: 'Amazon',
          url: '/orders/marketplace/amazon',
        },
        {
          title: 'Walmart',
          url: '/orders/marketplace/walmart',
        },
        {
          title: 'Ebay',
          url: '/orders/marketplace/ebay',
        },
        {
          title: 'Etsy',
          url: '/orders/marketplace/etsy',
        },
        {
          title: 'Amazon Return',
          url: '/orders/marketplace/return-amazon',
        },
        {
          title: 'Walmart Return',
          url: '/orders/marketplace/return-walmart',
        },
      ]
    },
    {
      title: 'Package-Claim',
      url: '/orders/package-claim',
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
    if (typeof (menuOrder.url) === 'string') {
      this.router.navigate([menuOrder.url]);
    }
  }
}
