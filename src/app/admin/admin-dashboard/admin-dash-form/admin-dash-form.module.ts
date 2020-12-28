import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDashFormPageRoutingModule } from './admin-dash-form-routing.module';

import { AdminDashFormPage } from './admin-dash-form.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonicSelectableModule } from 'ionic-selectable';

import {DatePipe} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDashFormPageRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    IonicSelectableModule
  ],
  declarations: [AdminDashFormPage]
})
export class AdminDashFormPageModule {}
