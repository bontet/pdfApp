import { UserService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userForm: FormGroup;

  public errorMessages = MessageService.errorMessages;

  constructor(
    private formBuilder: FormBuilder,
    private _users: UserService,
    private _alerts: AlertService,
    private _routers: Router,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private _nav: NavController
  ) {  }

  ngOnInit() {
    // this.hasLogin()
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  hasLogin() {
    if (this._users.userValue) {
      this._nav.navigateRoot(['/backend'], { replaceUrl: true }).then(() => {
        window.location.reload();
      });
    }
  }

  async onSubmit() {
    const data = this.userForm.value;
    const login = {
      fname: this._users.fakeLogin.name,
      _sid: this._users.randomString(4) + '-' + this._users.randomString(6) + '-' + this._users.randomString(10)
    }

    if (data.username !== this._users.fakeLogin.username) {
      this._alerts.shows('Invalid Username', 'middle', 'danger');
      return;
    } else if (data.password !== this._users.fakeLogin.password) {
      this._alerts.shows('Invalid Password', 'middle', 'danger');
      return;
    } else {
      localStorage.setItem('_users', JSON.stringify(login));
      const loading = await this.loadingController.create({
        message: 'Authenticate...',
        duration: 2500,
        spinner: 'bubbles'
      });
      await loading.present();
      setTimeout(() => {
        window.location.reload();
      }, 2400);

    }
  }

  close() {
    this.modalController.dismiss();
  }


}
