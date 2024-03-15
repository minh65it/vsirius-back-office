import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination, PaginationResult2 } from 'src/modules/_shared/_helpers/pagination-utility';
import { ClaimSearchParam, DocumentType as DocType } from 'src/modules/_shared/_helpers/params/package-claim';
import { ClaimDto } from 'src/modules/_shared/_models/return-orders/package-claim';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { OrdersAmazonService } from 'src/modules/_shared/_services/orders-processor/orders-amazon.service';
import { OrdersWalmartService } from 'src/modules/_shared/_services/orders-processor/orders-walmart.service';
import { PackageClaimService } from 'src/modules/_shared/_services/return-orders/package-claim.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {

  subscription = Subscription.EMPTY;
  claimSearchParam: ClaimSearchParam = {} as ClaimSearchParam;
  pagination: PaginationResult2<ClaimDto> = {
    data: [],
    pageNumber: 1,
    pageSize: 25,
    totalCount: null,
    pageCount: 1
  };
  listClaim: ClaimDto[] = [];
  _selectedColumns: any[];
  cols: any[];
  listDocumentType: any[] = [];
  listChoosePagination = [
    {
      key: 25,
      value: '25 results'
    },
    {
      key: 50,
      value: '50 results'
    },
    {
      key: 100,
      value: '100 results'
    },
    {
      key: 200,
      value: '200 results'
    }
  ];
  constructor(
    private router: Router,
    private service: PackageClaimService,
    private notiflix: NgxNotiflixService,
    private serviceAmazon: OrdersAmazonService,
    private serviceWalmart: OrdersWalmartService,
  ) { }

  ngOnInit() {
    this.listDocumentType = Object.keys(DocType)
      .filter(key => isNaN(Number(key))).map(key => ({ key, value: DocType[key] }));
    this.generateTable();
    this.loadData();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  generateTable() {
    this.cols = [
      { field: 'documentType', header: 'Document Type' },
      { field: 'marketplace', header: 'Marketplace' },
      { field: 'marketplaceOrderId', header: 'Marketplace Order Id' },
      { field: 'rma', header: 'RMA' },
      { field: 'notes', header: 'Notes' },
      { field: 'scanDate', header: 'Scan Date' },

    ];
    this._selectedColumns = this.cols;
  }
  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getData(this.pagination, this.claimSearchParam).subscribe({
      next: res => {
        this.pagination = res;
        this.listClaim = res.data;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }
  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  clean() {
    this.claimSearchParam = {} as ClaimSearchParam;
    this.search();
  }
  detailReturnOrder(item: ClaimDto) {
    if (item.marketplace.includes('Amazon')) {
      this.serviceAmazon.currentID(item.marketplaceOrderId);
      this.router.navigate(['orders/marketplace/detail-amazon']);
    } else if (item.marketplace.includes('Walmart')) {
      this.serviceWalmart.currentID(item.marketplaceOrderId);
      this.router.navigate(['orders/marketplace/detail-walmart']);
    }
  }
  detailClaim(rma: string) {
    this.service.currentClaimRMAID(rma);
    this.router.navigate(['orders/detail-claim']);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }
  filterPagination(e: any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.pageSize = e;
    this.loadData();
  }
  getDocumentType($event: any) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
