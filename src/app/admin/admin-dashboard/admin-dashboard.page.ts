import { AdminDashFormPage } from './admin-dash-form/admin-dash-form.page';
import { UserService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  public columns: any;
  public rows: any;

  selected = [];
  SelectionType = SelectionType;

  isSearch = false;
  searchValue;

  constructor(
    private _users: UserService,
    private _api: ApiService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getFileList();
  }

  logOut() {
    this._users.logout();
  }

  addNew() {
    
  }

  async getFileList() {
    const getEmpID = this._users.fakeLogin.empID;
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'dk-loading'
    });
    await loading.present();
    this._api.getListCatalogsNoFilter().subscribe((r) => {
      if (r.status === 200) {
        loading.dismiss();
        this.rows = r.data;
      } else {
        loading.dismiss();
      }
    }, () => {
      loading.dismiss();
    });
  }

  async create() {
    const modal = await this.modalController.create({
      component: AdminDashFormPage,
      backdropDismiss: false,
      componentProps: { method: 'Create', onUpdateData: null }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data === 'reload') {
      this.ngOnInit();
    }
  }

  async onSelect({ selected }) {
    const modal = await this.modalController.create({
      component: AdminDashFormPage,
      backdropDismiss: false,
      componentProps: {
        method: 'Update',
        onUpdateData: selected
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data === 'reload') {
      this.ngOnInit();
    }
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }
}
