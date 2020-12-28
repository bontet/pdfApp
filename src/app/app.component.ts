import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Spring',
      url: '/folder/Spring',
      icon: 'calendar'
    },
    {
      title: 'Summer',
      url: '/folder/Summer',
      icon: 'calendar'
    },
    {
      title: 'Fall',
      url: '/folder/Fall',
      icon: 'calendar'
    },
    {
      title: 'Winter',
      url: '/folder/Winter',
      icon: 'calendar'
    }
  ];
  public labels = ['Pedro'];

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

  constructor(
    private platform: Platform,
    private _menus: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  closeSideNav() {
    this._menus.close()
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
