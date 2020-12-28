import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDashFormPage } from './admin-dash-form.page';

describe('AdminDashFormPage', () => {
  let component: AdminDashFormPage;
  let fixture: ComponentFixture<AdminDashFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
