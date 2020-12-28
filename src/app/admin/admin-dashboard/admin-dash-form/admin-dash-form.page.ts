import { MessageService } from 'src/app/services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/users.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

var BASE64_MARKER = ';base64,';

@Component({
  selector: 'app-admin-dash-form',
  templateUrl: './admin-dash-form.page.html',
  styleUrls: ['./admin-dash-form.page.scss'],
})
export class AdminDashFormPage implements OnInit {

  public adminForm: FormGroup;

  public errorMessages = MessageService.errorMessages;

  urlSafe: SafeResourceUrl;

  @Input() onUpdateData: any = [];
  @Input() method: string;

  previewPDF: any;

  fileName: string;
  previewImage: any;
  imagesBinary: File[];
  uploadPdfFile = false;

  // cover
  coverFileName: string;
  coverFilePreview: any;
  coverPreview: any;
  coverFileBinary: File[];
  uploadCoverFile = false;

  public season = [
    {
      id: 1,
      name: 'Spring'
    },
    {
      id: 1,
      name: 'Summer'
    },
    {
      id: 1,
      name: 'Fall'
    },
    {
      id: 1,
      name: 'Winter'
    }
  ]

  public rangePrice = [
    {
      id: 1,
      name: '< 399.000',
    },
    {
      id: 2,
      name: '400,000 - 799,000',
    },
    {
      id: 3,
      name: '800,000 - 1,199,000',
    },
    {
      id: 4,
      name: '1,200,000 - 1,599,000',
    },
    {
      id: 5,
      name: '1,600,000 - 1,999,000',
    },
    {
      id: 6,
      name: '> 2,000,000',
    }
  ]

  public isWeeks = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private _alerts: AlertService,
    private _userService: UserService,
    private sanitizer: DomSanitizer,
    private ngDatePipe: DatePipe
  ) { }

  ngOnInit() {
    this.formSetting();
    const res = this.getWeekNumber(new Date());

    [new Date().getFullYear()].forEach(year => {
      for (let i = 1; i < Number(this.weeksInYear(year)) + 1; i++) {
        this.isWeeks.push({ id: i, name: 'Week ' + i });
      }
    }
    );
  }

  closeForm() {
    this.modalController.dismiss('close');
  }

  formSetting() {
    this.adminForm = this.formBuilder.group({
      name: [this.onUpdateData === null ? '' : this.onUpdateData[0].name, Validators.required],
      season: [this.onUpdateData === null ? '' : this.onUpdateData[0].season, Validators.required],
      weeks: [this.onUpdateData === null ? '' : this.onUpdateData[0].week_catalog, Validators.required],
      priceRange: [this.onUpdateData === null ? '' : this.onUpdateData[0].range_price, Validators.required],
    });

    if (this.method === 'Update') {
      this.previewImage = true;
      this.previewPDF = 'https://clouds.ptkcg.co.id/pedro/webcatalogs/' + this.onUpdateData[0].filename;

      if (this.onUpdateData[0].thumb === null) {
        this.coverFilePreview = false;
      } else {
        this.coverFilePreview = true;
        this.coverPreview = 'https://clouds.ptkcg.co.id/pedro/webcatalogs/' + this.onUpdateData[0].thumb;
      }

      if (this.onUpdateData[0].week_catalog === null || this.onUpdateData[0].week_catalog === '') {
        const date = new Date()
        this.adminForm.controls.weeks.setValue(this.ngDatePipe.transform(date, 'yyyy-mm-dd'));
      } else {
        this.adminForm.controls.weeks.setValue(this.onUpdateData[0].week_catalog);
      }

      const isSeasons = this.season.find((e) => e.name === this.onUpdateData[0].seasons);
      const isRangePrice = this.rangePrice.find((e) => e.name === this.onUpdateData[0].range_price);
      if (isRangePrice !== undefined || isRangePrice !== null) {
        this.adminForm.controls.priceRange.setValue(isRangePrice);
      }

      if (isSeasons !== undefined || isSeasons !== null) {
        this.adminForm.controls.season.setValue(isSeasons);
      }
    }
  }

  seasonChange(ev: any) {

  }

  convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  fileUploads(files: File[]) {
    this.fileName = files[0].name;
    if (files[0].type === 'application/pdf') {
      if (files[0].size < 2000000) {
        this.imagesBinary = files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.previewImage = reader.result;
          this.previewPDF = this.convertDataURIToBinary(reader.result);
        }
      } else {
        this._alerts.shows('File size to Large...', 'middle', 'danger');
        return;
      }
    } else {
      this.alertConfirmFailedUpload('PDF');
      return;
    }
  }

  uploadCover(files: File[]) {
    this.coverFileName = files[0].name;
    if (files[0].type === 'image/jpeg') {
      if (files[0].size < 3000000) {
        this.uploadCoverFile = true
        this.coverFileBinary = files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.coverFilePreview = reader.result;
          this.coverPreview = reader.result;
          // this.previewPDF = this.convertDataURIToBinary(reader.result);
        }
      } else {
        this._alerts.shows('File size to Large...', 'middle', 'danger');
        return;
      }
    } else {
      this.alertConfirmFailedUpload('JPG');
      return;
    }
  }

  async alertConfirmFailedUpload(format: string) {
    const alert = await this.alertController.create({
      header: 'Invalid file Format!',
      message: 'Please use '+format+' format!!!',
      buttons: [
        {
          text: 'Try Again',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }
      ]
    });
    await alert.present();
  }

  async onSubmit() {
    const formData = new FormData();
    const data = this.adminForm.value;
    const empID = this._userService.fakeLogin.empID;

    const hasData = {
      name: data.name,
      user: empID,
      season: data.season.name,
      weeks: data.weeks,
      rangePrice: data.priceRange.name
    }

    console.log(hasData);
    if (this.coverFileBinary === undefined) {
      this._alerts.shows('Cover catalog tidak boleh kosong...', 'middle', 'danger');
      return;
    }

    if (this.adminForm.valid) {
      switch (this.method) {
        case 'Create':
          if (this.imagesBinary === undefined || this.coverFileBinary === undefined) {
            // upload without image
            this.uploadData(hasData);
          } else {
            // upload with images
            Array.from(this.imagesBinary).forEach(f => {
              formData.append('file', f);
              formData.append('name', data.name);
              formData.append('season', data.season.name);
              formData.append('weeks', data.weeks);
              formData.append('user', empID);
              formData.append('rangePrice', data.priceRange.name);
            });
            Array.from(this.coverFileBinary).forEach(t => {
              formData.append('thumb', t);
            })
            this.uploadData(formData);
          }
          break;
        case 'Update':
          console.log('Ini updated')
          if (this.imagesBinary === undefined && this.coverFileBinary === undefined) {
            // upload without image
            this.updateData(hasData);
          } 

          if (this.imagesBinary !== undefined && this.uploadPdfFile === true) {
            // upload with images
            Array.from(this.imagesBinary).forEach(f => {
              formData.append('file', f);
              formData.append('name', data.name);
              formData.append('user', empID);
              formData.append('season', data.season.name);
              formData.append('weeks', data.weeks);
              formData.append('rangePrice', data.priceRange.name);
            });
            this.updateData(formData);
          }

          if (this.coverFileBinary !== undefined && this.uploadCoverFile === true) {
            Array.from(this.coverFileBinary).forEach(t => {
              formData.append('thumb', t);
              formData.append('name', data.name);
              formData.append('user', empID);
              formData.append('season', data.season.name);
              formData.append('weeks', data.weeks);
              formData.append('rangePrice', data.priceRange.name);
            })
            this.updateData(formData);
          }

          if (this.imagesBinary !== undefined && this.coverFileBinary !== undefined) {
            Array.from(this.imagesBinary).forEach(f => {
              formData.append('file', f);
              formData.append('name', data.name);
              formData.append('user', empID);
              formData.append('season', data.season.name);
              formData.append('weeks', data.weeks);
              formData.append('rangePrice', data.priceRange.name);
            });
            Array.from(this.coverFileBinary).forEach(t => {
              formData.append('thumb', t);
            })
            this.updateData(formData);
          }
          break;
        default:
          break;
      }
    }
  }


  async updateData(formData: any) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present().then((_) => {
      this.api.updateCatalog(formData, this.onUpdateData[0].id).subscribe((r) => {
        if (r.status === 200) {
          loading.dismiss();
          this._alerts.shows('Successfully Update!', 'middle', 'success');
          setTimeout(() => {
            this.modalController.dismiss('reload');
          }, 2000);
        } else {
          this._alerts.shows('Failed to Update...Please Try again!', 'middle', 'danger');
          loading.dismiss();
        }
      }, () => {
        this._alerts.shows('Failed to Update...Please Try again!', 'middle', 'danger');
        loading.dismiss()
      });
    });
  }

  async uploadData(formData: any) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles'
    });
    await loading.present().then((_) => {
      this.api.createCatalog(formData).subscribe((r) => {
        if (r.status === 200) {
          loading.dismiss();
          this._alerts.shows('Successfully', 'middle', 'success');
          setTimeout(() => {
            this.modalController.dismiss('reload');
          }, 2000);
        }
      }, () => {
        this._alerts.shows('Failed to Create...Please Try again!', 'middle', 'danger');
        loading.dismiss()
      });
    });
  }

  async deleteData() {
    const _usersName = this._userService.fakeLogin.empID;
    const alert = await this.alertController.create({
      message: '<strong>Are you sure to delete this data</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Delete',
          handler: () => {
            const hasDeleteData = {
              id: Number(this.onUpdateData[0].id),
              update_by: _usersName,
              isDelete: 'Y'
            }
            this.api.deleteCatalog(this.onUpdateData[0].id, _usersName).subscribe((r) => {
              if (r.status === 200) {
                this._alerts.shows('Data Deleted!', 'middle', 'success');
                this.modalController.dismiss('reload');
              }
            }, () => {
              this._alerts.shows('Failed to Delete...Please Try again!', 'middle', 'danger');
              this.modalController.dismiss('noReload');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Count week
  getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart: any = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
    return [d.getFullYear(), weekNo];
  }

  weeksInYear(year) {
    var d = new Date(year, 11, 31);
    var week = this.getWeekNumber(d)[1];
    return week == 1 ? 52 : week;
  }

}
