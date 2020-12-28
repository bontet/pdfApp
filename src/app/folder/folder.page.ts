import { environment } from 'src/environments/environment';
import { LoginPage } from './../pages/login/login.page';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public date: string;
  public list: any = [];
  isLogin = false;
  userName: string;
  previewPDF: any;

  pdfSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  default_image = environment.default_image;

  constructor(private activatedRoute: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private _alerts: AlertService,
    private _users: UserService,
  ) {
    this.previewPDF = 'https://clouds.ptkcg.co.id/pedro/webcatalogs/';
  }

  ngOnInit() {
    this.hasLogin();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.date = this.activatedRoute.snapshot.paramMap.get('dt');
    this.getAllCatalogs();
  }

  viewsPdf(url: string, title: string) {
    this._router.navigate(['/viewer', title], { queryParams: { v: url } });
  }

  toAdminDashboard() {
    this._router.navigate(['/backend'], {replaceUrl: true})
  }

  async getAllCatalogs() {
    const loading = await this.loadingController.create({
      message: 'Get Catalog...',
      spinner: 'bubbles'
    });
    await loading.present();
    this._api.getListCatalogs(this.folder)
    .subscribe((r) => {
      if (r.status === 200) {
        loading.dismiss();
        this.list = r.data;
      } else {
        loading.dismiss();
        this._alerts.shows('Catalog not found!', 'middle', 'warning');
      }
    }, () => {
      loading.dismiss();
      this._alerts.shows('Something wrong...please try again!', 'middle', 'danger');
    })
  }

  async admin() {
    const modal = await this.modalController.create({
    component: LoginPage,
    mode: 'ios',
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }

  hasLogin() {
    if (this._users.userValue) {
      this.userName = this._users.fakeLogin.name;
      this.isLogin = true;
    }
  }

}
