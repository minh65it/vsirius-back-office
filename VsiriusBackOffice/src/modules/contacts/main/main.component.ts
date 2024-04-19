import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { Contact } from 'src/modules/_shared/_models/contact';
import { ContactSignalRService } from 'src/modules/_shared/_services/contact-signalR.service';
import { ContactService } from 'src/modules/_shared/_services/contacts/contact.service';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { SignalRService } from 'src/modules/_shared/_services/signalR.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  listContacts: Contact[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'filter-custom';
  cols: any[];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  keyword: string = '';
  ContactModel: Contact = {
  } as Contact;
  contactDetailModel: Contact = {
  } as Contact;
  @ViewChild('modalEdit', { static: false }) modalEdit?: ModalDirective;
  user: any = JSON.parse(localStorage.getItem('USER'));
  constructor(private notiflix: NgxNotiflixService,
    private serviceSignalR: ContactSignalRService,
    private service: ContactService) { }
  ngOnInit() {
    this.generateTable()
    this.loadData();
    this.loadContactNotification();
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  generateTable() {
    this.cols = [
      { field: 'fullName', header: 'FullName' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'content', header: 'Content' },
      { field: 'createTime', header: 'Create Time' },
    ];
    this._selectedColumns = this.cols;
  }
  loadContactNotification() {
    this.serviceSignalR.notificationContactChangedEmitter.subscribe(res => {
      if (res != null) {
        this.loadData();
      }
    })
  }

  loadData() {
    this.notiflix.showLoading();
    this.service.getAllContacts(this.pagination, this.keyword).subscribe({
      next: res => {
        this.listContacts = res.result;
        console.log(this.listContacts);
        
        this.pagination = res.pagination;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  loadDetail(id: string) {
    this.notiflix.showLoading();
    this.service.getDetail(id).subscribe({
      next: res => {
        this.contactDetailModel = res;
        this.notiflix.hideLoading();
      },
      error: () => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    });
  }
  // thay đổi phân trang 
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  search() {
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }

  detail(item: Contact) {
    this.loadDetail(item.id);
    this.modalEdit.show();
  }

  update(item: Contact) {
    this.ContactModel = { ...item };
    this.ContactModel.status = !item.status;
    this.ContactModel.employeeId = this.user.id;
    this.service.update(this.ContactModel).subscribe({
      next: res => {
        res.success ? this.notiflix.success(res.message) :
          this.notiflix.error(res.message);
        this.loadData();
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
  }

  delete(item: Contact) {
    this.notiflix.confirm('Message', 'Do you want delete contact?', () => {
      this.notiflix.showLoading();
      this.service.delete(item).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) :
            this.notiflix.error(res.message);
          this.loadData();
          this.notiflix.hideLoading();
        },
        error: err => {
          this.notiflix.error(err);
          this.notiflix.hideLoading();
        }
      })
    })
  }
}
