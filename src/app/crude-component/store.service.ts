import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { defineCustomElements } from '@teamhive/lottie-player/loader';
defineCustomElements(window);
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
  private _isgoe_wireless_device_bulk_update = 'isgoe/wireless_device/bulk_update';

  constructor(private http: HttpClient) { }

  getToken() {
    const credentials = {
      "email": "admin@isg.us",
      "password": "admin@isg"
    }
    return this.http.post(environment.webBaseUrl + '/token', credentials);
  }

  getDevice_type() {
    return this.http.get(environment.webBaseUrl + this._isgoe_device_type, httpOptions);
  }

  postDevice_type(device: any) {
    debugger
    // let device = {
    //   "name": deviceName
    // }
    return this.http.post(environment.webBaseUrl + this._isgoe_device_type, device, httpOptions);
  }

  putDevice_type(deviceId: any) {  
    let device = {
      "name": deviceId.name
    }
    return this.http.put(environment.webBaseUrl + this._isgoe_device_type + '/' + deviceId.id, device, httpOptions);
  }

  deleteDevice_type(deviceId: any) {
    return this.http.delete(environment.webBaseUrl + this._isgoe_device_type + '/' + deviceId, httpOptions);
  }

  // manufacturer
  getphone_manufacturer() {
    // let url = setting.page+'&per_page='+setting.per_page+'&manufacturer='+setting.manufacturer+'&search_key='+setting.search_key+'&device_type='+setting.device_type;
    return this.http.get(environment.webBaseUrl + this._isgoe_phone_manufacturer + '?per_page=1000', httpOptions);
  }

  postphone_manufacturer(device: any) {
    // let device = {
    //   "name": deviceName
    // }
    return this.http.post(environment.webBaseUrl + this._isgoe_phone_manufacturer, device, httpOptions);
  }

  putphone_manufacturer(deviceId: any) {
    let name = {
      "name": deviceId.name,
      "active": deviceId.active,
    }
    return this.http.put(environment.webBaseUrl + this._isgoe_phone_manufacturer + '/' + deviceId.id, name, httpOptions);
  }

  deletephone_manufacturer(deviceId: any) {
    return this.http.delete(environment.webBaseUrl + this._isgoe_phone_manufacturer + '/' + deviceId, httpOptions);
  }

  // wireless_device
  getwireless_device(setting: any) { 
    //let isgoe_wireless_device = 'isgoe/wireless_device?page=';
    let isgoe_wireless_device = 'isgoe/wireless_device?page=';
    
    let url = setting.page+'&per_page='+setting.per_page+'&manufacturer='+setting.manufacturer+'&search_key='+setting.search_key+'&device_type='+setting.device_type;
    return this.http.get(environment.webBaseUrl + isgoe_wireless_device+url, httpOptions);
    //return this.http.get(environment.webBaseUrl + isgoe_wireless_device+setting.page+'&per_page='+setting.per_page, httpOptions);   
    //return this.http.get(environment.webBaseUrl + this._isgoe_wireless_device, httpOptions);
  }

  getWirelessSearch(search: any){

    let isgoe_wireless_device = 'isgoe/wireless_device?page=';
    
    let url = '&per_page='+search.per_page+'&manufacturer='+search.manufacturer+'&search_key='+search.search_key+'&device_type='+search.device_type+'&device_name='+search.device_name;
    return this.http.get(environment.webBaseUrl + isgoe_wireless_device+url, httpOptions);

  }

  postwireless_device(device: any) {

    // let device = {
    //   "name": "Kalley"
    // }
    return this.http.post(environment.webBaseUrl + this._isgoe_wireless_device, device, httpOptions);
  }

  postwireless_devicebulk_update (device: any) {

  //   let device2 =  [
  //     {
  //         "id":"69254",
  //         "active": "1"
  //     },
  //     {
  //         "id":"69254",
  //         "active": "0"
  //     }
  // ]
    return this.http.post(environment.webBaseUrl + this._isgoe_wireless_device_bulk_update, device, httpOptions);
  }

  putwireless_device(deviceId: any) {  
    debugger 
 
    let name = {
      "device_name": deviceId.device_name,
      "manufacturer_id": deviceId.manufacturer_id,
      "device_type": deviceId.device_type,
      "description" : deviceId.description,
      "active": deviceId.active
    }
    return this.http.put(environment.webBaseUrl + this._isgoe_wireless_device + '/' + deviceId.id,name, httpOptions);
  }

  sendbulkItemsUpdate(deviceId: any) {
 
    let name = {
      "device_name": deviceId.device_name,
      "manufacturer_id": deviceId.manufacturer_id,
      "device_type": deviceId.device_type,
      "description" : deviceId.description,
      "active": deviceId.active
    }
    return this.http.put(environment.webBaseUrl + this._isgoe_wireless_device + '/' + deviceId.id,name, httpOptions);
  }

  deletewireless_device(deviceId: any) {   
    return this.http.delete(environment.webBaseUrl + this._isgoe_wireless_device + '/' + deviceId, httpOptions);
  }

  isLoginService() {
    return this.http.get('https://satprocess.com/broadbandAdmin/index.php/site/islogin', httpOptions);
    // return this.http.get('https://isg-br-webdev/broadbandAdmin/index.php/site/islogin', httpOptions);
  }
}
