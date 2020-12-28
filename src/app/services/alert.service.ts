import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastController: ToastController) { }
  async presentToast(messages: any) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  async bottomAlert(messages: any) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }

  async shows(messages: any, positions: any, colors: string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: 2000,
      position: positions,
      color: colors
    });
    toast.present();
  }
}
