import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _isgoe_device_type = 'isgoe/device_type';
  private _isgoe_phone_manufacturer = 'isgoe/phone_manufacturer';
  private _isgoe_wireless_device = 'isgoe/wireless_device';
 
  constructor(private http: HttpClient) { }

  getToken() {
    const credentials = {
      "email": "admin@isg.us",
      "password": "admin@isg"
    }
    return this.http.post(environment.webBaseUrl + '/token', credentials);
  }

  getDevice_type() {
    //debugger
    return this.http.get(environment.webBaseUrl + this._isgoe_device_type, httpOptions);
  }

  postDevice_type(deviceName:string) {
    let device = {
      "name": deviceName
    }
    return this.http.post(environment.webBaseUrl + this._isgoe_device_type, device, httpOptions);
  }

  putDevice_type(deviceId:string) {
    return this.http.put(environment.webBaseUrl + this._isgoe_device_type + '/' + deviceId, httpOptions);
  }

  deleteDevice_type(deviceId:string) {
    return this.http.delete(environment.webBaseUrl + this._isgoe_device_type +  '/deviceId', httpOptions);
  }

  // manufacturer
  getphone_manufacturer() {
    return this.http.get(environment.webBaseUrl + this._isgoe_phone_manufacturer, httpOptions);
  }

  postphone_manufacturer(deviceName:string) {
    let device = {
      "name": deviceName
    }
    return this.http.post(environment.webBaseUrl + this._isgoe_phone_manufacturer, device, httpOptions);
  }

  putphone_manufacturer(deviceId:string) {
    return this.http.put(environment.webBaseUrl + this._isgoe_phone_manufacturer + '/' + deviceId, httpOptions);
  }

  deletephone_manufacturer(deviceId:string) {
    return this.http.delete(environment.webBaseUrl + this._isgoe_phone_manufacturer +  '/deviceId', httpOptions);
  }

  // wireless_device
  getwireless_device() {
    return this.http.get(environment.webBaseUrl + this._isgoe_wireless_device, httpOptions);
  }

  postwireless_device(deviceName:string) {
    let device = {
      "name": deviceName
    }
    return this.http.post(environment.webBaseUrl + this._isgoe_wireless_device, device, httpOptions);
  }

  putwireless_device(deviceId:string) {
    return this.http.put(environment.webBaseUrl + this._isgoe_wireless_device + '/' + deviceId, httpOptions);
  }

  deletewireless_device(deviceId:string) {
    return this.http.delete(environment.webBaseUrl + this._isgoe_wireless_device +  '/deviceId', httpOptions);
  }

}
