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
  
  TH: any=[];
  TR: any=[];
  COLUMNS: any[]=[];
  COLUMNS_WIRELESS_DEVICE: any[]=[
    "id","manufacturer_id","device_name","device_type","description","insert_date","active"
  ]
  
  COLUMNS_DEVICE_TYPE: any[]=[
    "id","name","insert_date"
  ]

  COLUMNS_PHONE_MANUFACTURERS: any[]=[
    "id","name","insert_date","active"
  ]

  action: any = "Save";

  filter: string =  "Filter"

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
    manufacturer_id: 'Choose...',
    device_name: '',
    device_type: 'Choose...',
    insert_date: '',
    description: '',
    active: 1
  }

  TH_DEVICE_TYPE: any[]=[
    "ID","Name","Insert Date"
  ];

  TH_WIRELESS_DEVICE: any[]=[
    "ID","Manufacturer","Device Name","Device Type","Description","Insert Date","Active"
  ]
  
  TH_PHONE_MANUFACTURERS: any[]=[
    "ID","Name","Insert Date","Active"
  ]

  phone_manufacturers_data:any = [ ]

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

  device_type_data:any = []

  constructor(private storeService: StoreService ) { }

  ngOnInit(): void {

    this.storeService.getDevice_type().subscribe(
      (data: any) => {      
        this.device_type_data = data.data;       
      }
    )

    this.storeService.getphone_manufacturer().subscribe(
      (data: any) => {      
        this.phone_manufacturers_data = data.data;
       
      }
    )

    this.get_wireless_device();
        
  }

  getTypeDeviceName(id: any){

    let name = "";

    this.device_type_data.forEach((item: any)=>{
      if(item.id == id){          
        name =  item.name      
      }
    })

    return name
  }

  getNameManufacturer(id: any){
    let name = "";    
    this.phone_manufacturers_data.forEach((item: any)=>{
      if(item.id == id){          
        name =  item.name      
      }
    })
    return name
  }

  get_wireless_device(){

    this.table_devide_type = false;
    this.table_phone_manufacturers = false;
    this.table_wireless_device= true;
    this.TH = this.TH_WIRELESS_DEVICE; 
   
    this.storeService.getwireless_device().subscribe(
      (data: any) => { 
        let items = data.data;
        items.forEach((item: any)=>{
          if(item.active == "0"){
            item.active = "No"
          }

          if(item.active == "1"){
            item.active = "Yes"
          }

          item.device_type = this.getTypeDeviceName(Number(item.device_type));
          item.manufacturer_id = this.getNameManufacturer(Number(item.manufacturer_id))


        })

        this.TR = items;
      
        this.COLUMNS = this.COLUMNS_WIRELESS_DEVICE;
      }
    )
  }  

  get_device_type(){

    this.TH = this.TH_DEVICE_TYPE;
    this.table_devide_type = true;
    this.table_phone_manufacturers = false;
    this.table_wireless_device= false;

    this.storeService.getDevice_type().subscribe(
      (data: any) => {      
        this.TR = data.data;
        this.COLUMNS = this.COLUMNS_DEVICE_TYPE;
      }
    )

  }

  get_phone_manufacturers(){

    this.table_devide_type = false;
    this.table_phone_manufacturers = true;
    this.table_wireless_device= false;
    this.TH = this.TH_PHONE_MANUFACTURERS;

    this.storeService.getphone_manufacturer().subscribe(
      (data: any) => {

        let items = data.data;
        items.forEach((item: any)=>{
          if(item.active == "0"){
            item.active = "No"
          }

          if(item.active == "1"){
            item.active = "Yes"
          }
             
        })
         
        this.TR = items;
        this.COLUMNS = this.COLUMNS_PHONE_MANUFACTURERS;
      }
    )

  }

  addWirelessDevice(){

    this.storeService.getphone_manufacturer().subscribe(
      (data: any) => {      
        this.phone_manufacturers_data = data.data;
      }
    )

    this.storeService.getDevice_type().subscribe(
      (data: any) => {      
        this.device_type_data = data.data;
      }
    )

  }

  addItem(){ 

    if(this.action == "Update"){   

      if(this.table_wireless_device){
        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value; 
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value;

        let newWirelessDevice = {
          "manufacturer_id": this.wirelessDevicesForm.manufacturer_id,
          "device_name": this.device_type_data.filter((item: any)=>{
            if (item.name == this.wirelessDevicesForm.device_type)
            return item
          }).id,
          "device_type": this.wirelessDevicesForm.device_type,
          "description":this.wirelessDevicesForm.description,
          "active":"1",
          "id": this.wirelessDevicesForm.id        
        }
        
        this.storeService.putwireless_device(newWirelessDevice).subscribe({
          next: (data: any) => {
            console.log(data)           
          },
          error: (e) => {
            console.log('There was an error sending the query', e.error.error);
          },
          complete: () => {
          },
        })            

        // this.wireless_device_data.forEach((item)=>{
        //   if(item.id == this.wirelessDevicesForm.id){
        //     item.manufacturer_id = this.wirelessDevicesForm.manufacturer_id;
        //     item.device_name = this.wirelessDevicesForm.device_name;
        //     item.device_type = this.wirelessDevicesForm.device_type;
        //     item.description = this.wirelessDevicesForm.description;
                    
        //   }          
        // })

      }

      if(this.table_devide_type){

        let newDeviceType = { 
          "id": this.deviceTypeForm.id,       
          "name": this.deviceTypeForm.name,
        }

        this.storeService.putDevice_type(newDeviceType).subscribe(
          (result: any) => {
            console.log(result)
            this. get_device_type();
          }
        );

        // this.device_type_data.forEach((item)=>{
        //   if(item.id == this.deviceTypeForm.id){
        //     item.name = this.deviceTypeForm.name;
                 
        //   }
        // })
  
      }

      if(this.table_phone_manufacturers){

        let newPhonemanufacturer = { 
          "id": this.phoneManufacturersForm,       
          "name": this.phoneManufacturersForm.name,
        }

        this.storeService.putphone_manufacturer(newPhonemanufacturer).subscribe(
          (result: any) => {
            console.log(result)
        
          }
        )
  
      }

    }else{

      //----------------add----------------------//      
      if(this.table_phone_manufacturers){

        let newPhoneManufacturer = {
          //"id": this.phoneManufacturersForm.id,
          "name": this.phoneManufacturersForm.name,
          //"active":1
        }

        this.storeService.postphone_manufacturer(newPhoneManufacturer).subscribe(
          {
            next: (data: any) => {

              this.storeService.getphone_manufacturer().subscribe(
                (data: any) => {
          
                  let items = data.data;
                  items.forEach((item: any)=>{
                    if(item.active == "0"){
                      item.active = "No"
                    }
          
                    if(item.active == "1"){
                      item.active = "Yes"
                    }
                       
                  })                   
                  this.TR = items;               
                }
              )                      
            },
            error: (e) => {
              console.log('There was an error sending the query', e.error.error);
            },
            complete: () => {
            },
          }
        )
        
      }
  
      if(this.table_wireless_device){

        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value; 
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value; 

        let newWirelessDevice = {
          "manufacturer_id": this.wirelessDevicesForm.manufacturer_id,
          "device_name": this.wirelessDevicesForm.device_name,
          "device_type": this.wirelessDevicesForm.device_type,
          "description":this.wirelessDevicesForm.description,
          "active":"1"         
        }

        this.storeService.postwireless_device(newWirelessDevice).subscribe({
          next: (data: any) => {
            console.log(data)           
          },
          error: (e) => {
            console.log('There was an error sending the query', e.error.error);
          },
          complete: () => {
          },
        })            
       
      }
  
      if(this.table_devide_type){

        let newDeviceType = {        
          "name":this.deviceTypeForm.name,
        }

        this.storeService.postDevice_type(newDeviceType).subscribe(
          {
            next: (data: any) => {
              this.storeService.getDevice_type().subscribe(
                (data: any) => {      
                  this.TR = data.data;
                }
              )                         
            },
            error: (e) => {
              console.log('There was an error sending the query', e.error.error);
            },
            complete: () => {
            },
          }
        )
      }
    }
  
  }  

  delete(id: any){

    if(this.table_wireless_device){

      this.storeService.deletewireless_device(id).subscribe(
        (resp) => {
          console.log(resp)
          // this.storeService.getwireless_device().subscribe(
          //   (data) => {      
          //     this.TR = data;
          //   }
          // )     
          
        }
      )

    }
    
    if(this.table_devide_type){

      this.storeService.deleteDevice_type(id).subscribe(
        (resp) => { 

          this.storeService.getDevice_type().subscribe(
            (data: any) => {      
              this.TR = data.data;
            }
          ) 
          
        }
      )  

    }

    if(this.table_phone_manufacturers){

      this.storeService.deletephone_manufacturer(Number(id)).subscribe(
        (resp) => {
          console.log(resp)        
          
          this.storeService.getphone_manufacturer().subscribe(
            (data: any) => {
      
              let items = data.data;
              items.forEach((item: any)=>{
                if(item.active == "0"){
                  item.active = "No"
                }
      
                if(item.active == "1"){
                  item.active = "Yes"
                }
              })                   
              this.TR = items;               
            }
          )  
          
        }
      )

    }

  }

  editWirelessDevice(id: any){
    this.action = "Update"

  }

  edit(id: any){
    this.action = "Update"
  
    if(this.table_wireless_device){

      this.TR.forEach((item: any)=>{

        if(item.id == id){
          console.log(item)
          this.wirelessDevicesForm.id = item.id;
          this.wirelessDevicesForm.device_name = item.device_name;
          this.wirelessDevicesForm.manufacturer_id = item.manufacturer_id;
          this.wirelessDevicesForm.device_type = item.device_type;
          this.wirelessDevicesForm.description = item.description;             
        }
  
      })

    }
    
    if(this.table_devide_type){

      this.TR.forEach((item: any)=>{

        if(item.id == id){
          this.deviceTypeForm.id = item.id;
          this.deviceTypeForm.name = item.name;
          this.deviceTypeForm.insert_date = item.insert_date;
        }
      
      })
    }

    if(this.table_phone_manufacturers){
      
      this.TR.forEach((item: any)=>{
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
