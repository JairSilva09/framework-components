import { Component, OnInit,ViewChild,ElementRef,AfterViewInit  } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: 'app-crude-component',
  templateUrl: './crude-component.component.html',
  styleUrls: ['./crude-component.component.scss']
})
export class CrudeComponentComponent implements OnInit {

  @ViewChild('manufacturer') manufacturer!: ElementRef;
  @ViewChild('deviceType') deviceType!: ElementRef;

  table_devide_type: boolean = false;
  table_wireless_device: boolean = true;
  table_phone_manufacturers: boolean = false;
  
  TH: any[]=[];
  TR: any[]=[];
  COLUMNS: any[]=[]; 

  action: any = "Save"

  phoneManufacturersForm: any = {
    id: '',
    name: '',
    insert_date: '',
    active: 1
  }

  deviceTypeForm: any = {
    id: '',
    name: '',
    insert_date: ''
  }

  wirelessDevicesForm: any = {
    id: '',
    manufacturer_id: '',
    device_name: '',
    device_type: '',
    insert_date: '',
    description: '',
    active: 1
  }

  TH_DEVICE_TYPE: any[]=[
    "id","name","insert date"
  ];

  TH_WIRELESS_DEVICE: any[]=[
    "id","manufacturer id","device name","device type","description","insert date","active"
  ]
  
  TH_PHONE_MANUFACTURERS: any[]=[
    "id","name","insert date","active"
  ]

  phone_manufacturers_data = [
    {
      "id": "33269",
      "name":"Apple",
      "insert_date":"2022-10-21",
      "active":1,
    },
    {
      "id": "33270",
      "name":"Google",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33271",
      "name":"Samsung",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33272",
      "name":"Nokia",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33273",
      "name":"Sony",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33274",
      "name":"LG",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33275",
      "name":"HTC",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33276",
      "name":"ZTE",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33277",
      "name":"Huawei",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33278",
      "name":"OnePlus",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "33279",
      "name":"Alcatel",
      "insert_date":"2022-10-21",
      "active":1
    }
    
  ]

  wireless_device_data = [
    {
      "id": "1",
      "manufacturer_id": "33271",
      "device_name":"Smiley",
      "device_type":"2",
      "description":"Samsung smiley phone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "2",
      "manufacturer_id": "33272",
      "device_name":"1",
      "device_type":"2",
      "description":"Nokia 1 Andoid smartphone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "3",
      "manufacturer_id": "33279",
      "device_name":"1",
      "device_type":"2",
      "description":"Alcatel 1 smartphone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "4",
      "manufacturer_id": "33289",
      "device_name":"1",
      "device_type":"2",
      "description":"Realme 1 Android Smarthphone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "5",
      "manufacturer_id": "33279",
      "device_name":"1 (2021)",
      "device_type":"2",
      "description":"Alcatel 1(2021), Android smart phone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "6",
      "manufacturer_id": "33272",
      "device_name":"1 Plus",
      "device_type":"2",
      "description":"Nokia 1 plus, Android smart phone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "7",
      "manufacturer_id": "33272",
      "device_name":"1.3",
      "device_type":"2",
      "description":"Nokia 1.3, Android smart phone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "8",
      "manufacturer_id": "33272",
      "device_name":"1.4",
      "device_type":"2",
      "description":"Nokia 1.4, Android smart phone",
      "insert_date":"2022-10-21",
      "active":1
    },
    {
      "id": "9",
      "manufacturer_id": "33275",
      "device_name":"10",
      "device_type":"2",
      "description":"HTC 10, Android smart phone",
      "insert_date":"2022-10-21",
      "active":1
    }
  ]

  device_type_data = [
    {
      "id": "1",
      "name":"Watch",
      "insert_date":"2022-10-21",
    
    },
    {
      "id": "2",
      "name":"Phone",
      "insert_date":"2022-10-21",
    },
    {
      "id": "3",
      "name":"Tablet",
      "insert_date":"2022-10-21",
    }
  
  ]

  constructor(private storeService: StoreService ) { }

  ngOnInit(): void {
    this.TH = this.TH_WIRELESS_DEVICE; 
    this.TR = this.wireless_device_data;
    this.COLUMNS = Object.keys(this.wireless_device_data[0]); 
    
    this.storeService.getDevice_type().subscribe(
      (data) => {
        console.log(data)
      }
    )
    
  }

  showTable(table: any){
    if(table == "wireless_device"){
      this.table_devide_type = false;
      this.table_phone_manufacturers = false;
      this.table_wireless_device= true;
      this.TH = this.TH_WIRELESS_DEVICE; 
      this.TR = this.wireless_device_data;
      this.COLUMNS = Object.keys(this.wireless_device_data[0]);
 
      
    }else if(table == "phone_manufacturers"){
      this.table_devide_type = false;
      this.table_phone_manufacturers = true;
      this.table_wireless_device= false;
      this.TH = this.TH_PHONE_MANUFACTURERS; 
      this.TR = this.phone_manufacturers_data;
      this.COLUMNS = Object.keys(this.phone_manufacturers_data[0]);
    }else if(table == "devide_type"){
      this.table_devide_type = true;
      this.table_phone_manufacturers = false;
      this.table_wireless_device= false;
      this.TH = this.TH_DEVICE_TYPE; 
      this.TR = this.device_type_data;
      this.COLUMNS = Object.keys(this.device_type_data[0]);
    }
  }

  addItem(){ 
    let date = new Date().toISOString();

    if(this.action == "Update"){   

      if(this.table_wireless_device){
        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value; 
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value; 

        this.wireless_device_data.forEach((item)=>{
          if(item.id == this.wirelessDevicesForm.id){
            item.manufacturer_id = this.wirelessDevicesForm.manufacturer_id;
            item.device_name = this.wirelessDevicesForm.device_name;
            item.device_type = this.wirelessDevicesForm.device_type;
            item.description = this.wirelessDevicesForm.description;
            item.insert_date = date;            
          }          
        })

      }

      if(this.table_devide_type){

        this.device_type_data.forEach((item)=>{
          if(item.id == this.deviceTypeForm.id){
            item.name = this.deviceTypeForm.name;
            item.insert_date = date;            
          }
        })
  
      }

      if(this.table_phone_manufacturers){
      
        this.phone_manufacturers_data.forEach((item)=>{
          if(item.id == this.phoneManufacturersForm.id){
            item.name = this.phoneManufacturersForm.name;
            item.insert_date = date;          
          }
         
        })
  
      }

    }else{

      if(this.table_phone_manufacturers){
        this.phone_manufacturers_data.push(
          {
            "id": this.phoneManufacturersForm.id,
            "name": this.phoneManufacturersForm.name,
            "insert_date":date,
            "active":1
          }
        )
      }
  
      if(this.table_wireless_device){
        let id = this.wireless_device_data.length + 1
        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value; 
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value;     
             
        this.wireless_device_data.push(
          {
            "id": id.toString(),
            "manufacturer_id": this.wirelessDevicesForm.manufacturer_id,
            "device_name": this.wirelessDevicesForm.device_name,
            "device_type": this.wirelessDevicesForm.device_type,
            "description":this.wirelessDevicesForm.description,
            "insert_date": date,
            "active":1
          }
        
        )
      }
  
      if(this.table_devide_type){
        let id = this.device_type_data.length + 1
        this.device_type_data.push(
          {
            "id": id.toString(),
            "name":this.deviceTypeForm.name,
            "insert_date":date,
          }      
        )
      }
    }
  
  }  

  delete(id: any){
    let count = 0

    if(this.table_wireless_device){

      this.wireless_device_data.forEach((item)=>{
        if(item.id == id){
          this.wireless_device_data.splice(count, 1);
        }
        count++;
      })

    }
    
    if(this.table_devide_type){

      this.device_type_data.forEach((item)=>{
        if(item.id == id){
          this.device_type_data.splice(count, 1);
        }
        count++;
      })

    }

    if(this.table_phone_manufacturers){
      
      this.phone_manufacturers_data.forEach((item)=>{
        if(item.id == id){
          this.phone_manufacturers_data.splice(count, 1);
        }
        count++;
      })

    }

  }

  edit(id: any){
    this.action = "Update"
  
    if(this.table_wireless_device){

      this.wireless_device_data.forEach((item)=>{
        if(item.id == id){
          this.wirelessDevicesForm.id = item.id;
          this.wirelessDevicesForm.device_name = item.device_name;
          this.wirelessDevicesForm.device_type = item.device_type;
          this.wirelessDevicesForm.description = item.description;
          this.wirelessDevicesForm.insert_date = item.insert_date;         
        }
  
      })

    }
    
    if(this.table_devide_type){

      this.device_type_data.forEach((item)=>{
        if(item.id == id){
          this.deviceTypeForm.id = item.id;
          this.deviceTypeForm.name = item.name;
          this.deviceTypeForm.insert_date = item.insert_date;
        }
      
      })

    }

    if(this.table_phone_manufacturers){
      
      this.phone_manufacturers_data.forEach((item)=>{
        if(item.id == id){
          this.phoneManufacturersForm.id = item.id;
          this.phoneManufacturersForm.name = item.name;
          this.phoneManufacturersForm.insert_date = item.insert_date;
          this.phoneManufacturersForm.active = item.active;
        }
      
      })

    }

  }

  close(){
    this.action = 'Save';
    this.reset();    
  }

  reset(){
    this.phoneManufacturersForm.id = '';
    this.phoneManufacturersForm.name = '';
    this.phoneManufacturersForm.insert_date = '';
    this.wirelessDevicesForm.device_name = '';
    this.wirelessDevicesForm.device_type = '';
    this.wirelessDevicesForm.manufacturer_id = '';
    this.wirelessDevicesForm.description = '';
  }
  
}
