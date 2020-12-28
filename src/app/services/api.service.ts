import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'client-keys': 'test'
});

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public base_url = environment.base_url;

  constructor(
    private _http: HttpClient
  ) { }

  public getListCatalogs(date: any):Observable<any> {
    return this._http.get(this.base_url + `pedro/webcatalogs?season=${date}`, { headers });
  }

  public getListCatalogsNoFilter():Observable<any> {
    return this._http.get(this.base_url + `pedro/webcatalogsnofilter`, { headers });
  }

  // Create Catalog
  public createCatalog(data: any): Observable<any> {
    return this._http.post(this.base_url + 'pedro/webcatalog', data, { 
      reportProgress: true,
      observe: 'events'
     });
  }

  // Update Catalog
  public updateCatalog(data: any, id: any): Observable<any> {
    return this._http.post(this.base_url + `pedro/webcatalogupdate?id=${id}`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // Delete Catalog
  public deleteCatalog(id: any, user: any):Observable<any> {
    return this._http.get(this.base_url + `pedro/webcatalogdelete?id=${id}&user=${user}`, { headers });
  }

}
