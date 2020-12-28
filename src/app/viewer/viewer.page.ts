import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
})
export class ViewerPage implements OnInit {
  title: string;
  url: string;
  urlSafe: SafeResourceUrl;
  isLoading = true;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.paramMap.get('title');
    this.activatedRoute.queryParams.subscribe((r) => {
      this.urlSafe= 'https://flowpaper.com/flipbook/https://clouds.ptkcg.co.id/pedro/webcatalogs/' + r.v
    });
  }

  myLoadEvent(ev: any) {
    console.log(ev);
  }

}
