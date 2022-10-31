import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { StoreService } from './store.service';

@Component({
  selector: 'app-crude-component',
  templateUrl: './crude-component.component.html',
  styleUrls: ['./crude-component.component.scss']
})
export class CrudeComponentComponent implements OnInit {

  @ViewChild('manufacturer') manufacturer!: ElementRef;
  @ViewChild('deviceType') deviceType!: ElementRef;
  @ViewChild('itemcheckbox') itemcheckbox!: ElementRef;
  @ViewChild('searchBar') searchBar!: ElementRef; 

  table_devide_type: boolean = false;
  table_wireless_device: boolean = true;
  table_phone_manufacturers: boolean = false;

  TH: any = [];
  TR: any = [];
  COLUMNS: any[] = [];
  COLUMNS_WIRELESS_DEVICE: any[] = [
    "id", "manufacturer_name", "device_name", "device_type_name", "description",  "active"
  ]

  COLUMNS_DEVICE_TYPE: any[] = [
    "id", "name"
  ]

  COLUMNS_PHONE_MANUFACTURERS: any[] = [
    "id", "name", "active"
  ]

  action: any = "Save";

  manufacturerFilter: string = "manufacturer"
  deviceTypeFilter: string = "device type"

  itemsOptionsFilterManufacturer: any = [];
  itemsOptionsFilterDeviceType: any = [];

  CHOOSE_NUM_ROWS: any[] = [
    "10","20","30","40","50","100"
  ];
  numRows: string = '10';

  numItemsActive: number = 0;

  total_pages: any;
  current_page: any;
  page: number = 1;

  //alertCheckbox: boolean = false;
  AllCheckbox: boolean = false;

  searchFilterManufacturer: any = "Select one";
  searchFilterDevice: any = "Select one";
  searchKeyword: any;
  search: any = {
    device_name: '',    
    manufacturer: '',
    search_key: '',
    device_type: '',
    per_page: '',
    page: '',
  }

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
    manufacturer_name: 'Choose...',
    device_name: '',
    device_type: '',
    device_type_name: 'Choose...',
    insert_date: '',
    description: '',
    active: 1
  }

  TH_DEVICE_TYPE: any[] = [
    "ID", "Name", "", ""
  ];

  TH_WIRELESS_DEVICE: any[] = [
    "ID", "Manufacturer", "Device Name", "Device Type", "Description",  "Active"
  ]

  TH_PHONE_MANUFACTURERS: any[] = [
    "ID", "Name", "Active"
  ]

  phone_manufacturers_data: any = []

  wireless_device_data: any = []

  device_type_data: any = []

  constructor(private storeService: StoreService) { }

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

    this.get_wireless_device(this.page.toString());

    this.selectedDeviceType('device type')
    this.selectedManufacturer('manufacturer')
  }

  ngAfterViewInit() {

    fromEvent(this.searchBar.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((text: any) => {

          this.search.search_key = this.searchBar.nativeElement.value,
            this.search.per_page = this.numRows;

          this.getWirelessBySearch(this.search)

        })
      )
      .subscribe();
  }

  getWirelessBySearch(keyword: any) {
    this.storeService.getWirelessSearch(keyword).subscribe(
      (data: any) => {
        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;

        let items = data.data
        items.forEach((item: any) => {
          // if(item.active == "0"){
          //   item.active = "No"
          // }

          // if(item.active == "1"){
          //   item.active = 'Yes'
          // }
          item.device_type_name = (this.device_type_data.filter((a:any) => a.id == item.device_type).length > 0)?this.device_type_data.filter((a:any) => a.id == item.device_type)[0].name:"";

          item.manufacturer_name = (this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id).length > 0)?this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id)[0].name:""
         
          //item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
          //item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
        })
        this.TR = items;
        this.numItemsActive = items.filter((a: any) => a.active == "1").length;
        if (this.numItemsActive == 10) {
          this.AllCheckbox = true;
        } else {
          this.AllCheckbox = false;
        }
        this.TR = items;
        console.log(data)
      }
    )
  }

  getTypeDeviceName(id: any) {

    let name = "";

    this.device_type_data.forEach((item: any) => {
      if (item.id == id) {
        name = item.name
      }
    })

    return name
  }

  getNameManufacturer(id: any) {
    let name = "";
    this.phone_manufacturers_data.forEach((item: any) => {
      if (item.id == id) {
        name = item.name
      }
    })
    return name
  }

  get_wireless_device(page: string) {

    // let setting = {
    //   per_page: this.numRows,
    //   page: page
    // }
    this.search.per_page = this.numRows;
    this.search.page = page;
    this.table_devide_type = false;
    this.table_phone_manufacturers = false;
    this.table_wireless_device = true;
    this.TH = this.TH_WIRELESS_DEVICE;

    this.storeService.getwireless_device(this.search).subscribe(
      (data: any) => {
        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;

        let items = data.data;
        console.log(data)
        items.forEach((item: any) => {
          // if(item.active == "0"){
          //   item.active = "No"
          // }

          // if(item.active == "1"){
          //   item.active = 'Yes'
          // }
          item.device_type_name = (this.device_type_data.filter((a:any) => a.id == item.device_type).length > 0)?this.device_type_data.filter((a:any) => a.id == item.device_type)[0].name:"";

          item.manufacturer_name = (this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id).length > 0)?this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id)[0].name:""
          //item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
          //item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
        })
        this.TR = items;
        this.numItemsActive = items.filter((a: any) => a.active == "1").length;
        if (this.numItemsActive == 10) {
          this.AllCheckbox = true;
        } else {
          this.AllCheckbox = false;
        }

        this.TR = items;
        this.COLUMNS = this.COLUMNS_WIRELESS_DEVICE;
      }
    )
  }

  get_device_type() {
    console.log('device type')

    this.TH = this.TH_DEVICE_TYPE;
    this.table_devide_type = true;
    this.table_phone_manufacturers = false;
    this.table_wireless_device = false;

    this.storeService.getDevice_type().subscribe(
      (data: any) => {
        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;
        this.TR = data.data;
        this.COLUMNS = this.COLUMNS_DEVICE_TYPE;
      }
    )

  }

  get_phone_manufacturers() {
    console.log('manufacturer')

    this.table_devide_type = false;
    this.table_phone_manufacturers = true;
    this.table_wireless_device = false;
    this.TH = this.TH_PHONE_MANUFACTURERS;

    this.storeService.getphone_manufacturer().subscribe(
      (data: any) => {
        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;

        let items = data.data;

        this.TR = items;
        this.COLUMNS = this.COLUMNS_PHONE_MANUFACTURERS;
      }
    )

  }

  addWirelessDevice() {

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

  addItem() {

    if (this.action == "Update") {

      if (this.table_wireless_device) {
        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value;
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value;

        let newWirelessDevice = {
          "manufacturer_id": this.wirelessDevicesForm.manufacturer_id,
          "device_name": this.wirelessDevicesForm.device_name,
          "device_type": this.wirelessDevicesForm.device_type,
          "description": this.wirelessDevicesForm.description,
          "active": "1",
          "id": this.wirelessDevicesForm.id
        }

        this.storeService.putwireless_device(newWirelessDevice).subscribe({
          next: (data: any) => {
            this.search.per_page = this.numRows;
            this.search.page = this.current_page;
            this.storeService.getwireless_device(this.search).subscribe(
              (data: any) => {
                let items = data.data;
                items.forEach((item: any) => {
                  if (item.active == "0") {
                    item.active = "No"
                  }

                  if (item.active == "1") {
                    item.active = "<input class='form-check-input me-1' type='checkbox' value='' aria-label='...'>"
                  }
                  item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
                  item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
                })

                this.TR = items;
                console.log(this.TR)

                this.COLUMNS = this.COLUMNS_WIRELESS_DEVICE;
              }
            )
          },
          error: (e) => {
            console.log('There was an error sending the query', e.error.error);
          },
          complete: () => {
          },
        })
      }

      if (this.table_devide_type) {

        let newDeviceType = {
          "id": this.deviceTypeForm.id,
          "name": this.deviceTypeForm.name,
        }

        this.storeService.putDevice_type(newDeviceType).subscribe(
          (result: any) => {
            console.log(result)
            this.get_device_type();
          }
        );
      }

      if (this.table_phone_manufacturers) {
        console.log(this.phoneManufacturersForm)

        let newPhoneManufacturer = {
          "id": this.phoneManufacturersForm.id,
          "name": this.phoneManufacturersForm.name,
        }

        this.storeService.putphone_manufacturer(newPhoneManufacturer).subscribe(
          (result: any) => {
            console.log(result)

          }
        )

      }

    } else {

      //----------------add----------------------//      
      if (this.table_phone_manufacturers) {

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

      if (this.table_wireless_device) {

        this.wirelessDevicesForm.manufacturer_id = this.manufacturer.nativeElement.value;
        this.wirelessDevicesForm.device_type = this.deviceType.nativeElement.value;

        let newWirelessDevice = {
          "manufacturer_id": this.wirelessDevicesForm.manufacturer_id,
          "device_name": this.wirelessDevicesForm.device_name,
          "device_type": this.wirelessDevicesForm.device_type,
          "description": this.wirelessDevicesForm.description,
          "active": "1"
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

      if (this.table_devide_type) {

        let newDeviceType = {
          "name": this.deviceTypeForm.name,
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
    this.reset();
  }

  delete(id: any) {

    if (this.table_wireless_device) {

      this.storeService.deletewireless_device(id).subscribe(
        (resp) => {
          this.search.per_page = this.numRows;
          this.search.page = this.current_page;
          this.storeService.getwireless_device(this.search).subscribe(
            (data: any) => {
              let items = data.data;
              items.forEach((item: any) => {
                item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
                item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
              })
              this.TR = items;
            }
          )


        }
      )

    }

    if (this.table_devide_type) {

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

    if (this.table_phone_manufacturers) {

      this.storeService.deletephone_manufacturer(Number(id)).subscribe(
        (resp) => {
          console.log(resp)

          this.storeService.getphone_manufacturer().subscribe(
            (data: any) => {

              let items = data.data;

              this.TR = items;
            }
          )

        }
      )

    }
  }

  editWirelessDevice(id: any) {
    this.action = "Update"
  }

  edit(id: any) {
    this.action = "Update"

    if (this.table_wireless_device) {

      this.TR.forEach((item: any) => {

        if (item.id == id) {
          console.log(item)
          this.wirelessDevicesForm.id = item.id;
          this.wirelessDevicesForm.device_name = item.device_name;
          this.wirelessDevicesForm.manufacturer_id = item.manufacturer_id;
          this.wirelessDevicesForm.device_type = item.device_type;
          this.wirelessDevicesForm.description = item.description;
        }

      })

    }

    if (this.table_devide_type) {

      this.TR.forEach((item: any) => {

        if (item.id == id) {
          this.deviceTypeForm.id = item.id;
          this.deviceTypeForm.name = item.name;
          this.deviceTypeForm.insert_date = item.insert_date;
        }

      })
    }

    if (this.table_phone_manufacturers) {

      this.TR.forEach((item: any) => {
        if (item.id == id) {
          this.phoneManufacturersForm.id = item.id;
          this.phoneManufacturersForm.name = item.name;
          this.phoneManufacturersForm.insert_date = item.insert_date;
          this.phoneManufacturersForm.active = item.active;
        }

      })

    }

  }

  close() {
    this.action = 'Save';
    this.reset();
  }

  selectedDeviceType(filter: string) {
    this.deviceTypeFilter = filter;
    console.log(this.deviceTypeFilter)
    if (filter == "manufacturer") {
      this.storeService.getphone_manufacturer().subscribe(
        (data: any) => {
          this.itemsOptionsFilterManufacturer = data.data;
        }
      )
    }

    if (filter == "device type") {
      this.storeService.getDevice_type().subscribe(
        (data: any) => {
          this.itemsOptionsFilterDeviceType = data.data;
        }
      )
    }

  }

  selectedManufacturer(filter: string) {
    this.manufacturerFilter = filter;
    console.log(this.manufacturerFilter)
    if (filter == "manufacturer") {
      this.storeService.getphone_manufacturer().subscribe(
        (data: any) => {
          this.itemsOptionsFilterManufacturer = data.data;
        }
      )
    }

    if (filter == "device type") {
      this.storeService.getDevice_type().subscribe(
        (data: any) => {
          this.itemsOptionsFilterDeviceType = data.data;
        }
      )
    }

  }

  nextPage(page: any) {

    // let setting = {
    //   per_page: this.numRows,
    //   page: page 
    // } 
    this.search.per_page = this.numRows;
    this.search.page = page;

    this.storeService.getwireless_device(this.search).subscribe(
      (data: any) => {

        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;

        let items = data.data;

        items.forEach((item: any) => {

          //item.device_type_name = this.device_type_data.filter((a:any) => a.id == item.device_type)[0].name

          //item.manufacturer_name = this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id)[0].name

          item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
          item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
        })

        this.numItemsActive = items.filter((a: any) => a.active == "1").length;
        if (this.numItemsActive == 10) {
          this.AllCheckbox = true;
        } else {
          this.AllCheckbox = false;
        }
        this.TR = items;

      }
    )
  }

  chooseNumRows(rows: string){
    this.numRows = rows;
    this.search.per_page = rows;
    this.storeService.getwireless_device(this.search).subscribe(
      (data: any) => {

        this.total_pages = data.meta.last_page;
        this.current_page = data.meta.current_page;
        
        let items = data.data;
   
        items.forEach((item: any)=>{
          
          //item.device_type_name = this.device_type_data.filter((a:any) => a.id == item.device_type)[0].name

          //item.manufacturer_name = this.phone_manufacturers_data.filter((a:any) => a.id == item.manufacturer_id)[0].name
         
          item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
          item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
        })

        this.numItemsActive = items.filter((a:any) => a.active == "1").length;
        if(this.numItemsActive == 10){
          this.AllCheckbox = true;
        }else{
          this.AllCheckbox = false;
        }        
        this.TR = items;
      }
    ) 
     
  }

  reset() {
    this.phoneManufacturersForm.id = '';
    this.phoneManufacturersForm.name = '';
    this.phoneManufacturersForm.insert_date = '';
    this.wirelessDevicesForm.device_name = '';
    this.wirelessDevicesForm.device_type = '';
    this.wirelessDevicesForm.manufacturer_id = '';
    this.wirelessDevicesForm.description = '';
    this.deviceTypeForm.name = '';
    this.deviceTypeForm.id = '';
  }

  stateCheckbox(state: string) {
    if (state == "0") {
      return false
    } else if (state == "1") {
      return true
    } else {
      return false
    }
  }

  checkValue(id: any, active: string) {
    let newactive;
    console.log(this.itemcheckbox.nativeElement.checked)
    if (active == "1") {
      newactive = "0"
      this.numItemsActive++;
    } else {
      newactive = "1"
      this.numItemsActive--;
    }

    if (this.table_wireless_device) {

      let newWirelessDevice = {
        "active": newactive,
        "id": id
      }

      this.storeService.putwireless_device(newWirelessDevice).subscribe({
        next: (data: any) => {
          this.search.per_page = this.numRows;
          this.search.page = this.current_page;
          this.storeService.getwireless_device(this.search).subscribe(
            (data: any) => {
              let items = data.data;
              items.forEach((item: any) => {
                item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
                item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
              })
              this.numItemsActive = items.filter((a: any) => a.active == "1").length;
              this.TR = items;
              if (this.numItemsActive == 10) {
                this.AllCheckbox = true
              } else {
                this.AllCheckbox = false
              }
            }
          )
        },
        error: (e) => {
          console.log('There was an error sending the query', e.error.error);
        },
        complete: () => {
        },
      })
    }

    if (this.table_phone_manufacturers) {

      let newPhoneManufacturer = {
        "name": "inc",
        "active": newactive,
        "id": id
      }

      this.storeService.putphone_manufacturer(newPhoneManufacturer).subscribe({
        next: (data: any) => {
          this.storeService.getphone_manufacturer().subscribe(
            (data: any) => {

              let items = data.data;
              this.TR = items;

            }
          )
        },
        error: (e) => {
          console.log('There was an error sending the query', e.error.error);
        },
        complete: () => {
        },
      })

    }

  }

  alertCheckbox(){
    let text = "Sure you want to enable/disable these records?.";
    if (confirm(text) == true) {
     
      this.checkValueAll();
    } else {
      text = "Canceled!";
    }
  }

  checkValueAll() {
  
    let newStateCheckbox: any;
    this.AllCheckbox = !this.AllCheckbox;

    if (this.AllCheckbox == true) {
      newStateCheckbox = "1"
    } else {
      newStateCheckbox = "0"
    }

    this.TR.forEach((item: any) => {
      let newWirelessDevice = {
        "active": newStateCheckbox,
        "id": item.id
      }

      // this.sp.myservice(data).pipe(
      //   tap(() => this.isUpdate = true),
      //   delay(5000),
      // ).subscribe(() => this.isUpdate = false);
      
      this.storeService.putwireless_device(newWirelessDevice).pipe(
       
        tap((text: any) => {        

        }),
        delay(1000)      
      ).subscribe({
        next: (data: any) => {
          this.search.per_page = this.numRows;
          this.search.page = this.current_page;
          this.storeService.getwireless_device(this.search).subscribe(
            (data: any) => {
              let items = data.data;
              items.forEach((item: any) => {
                item.device_type_name = this.getTypeDeviceName(Number(item.device_type));
                item.manufacturer_name = this.getNameManufacturer(Number(item.manufacturer_id))
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
      })

    })
  }

  settingFilterManufacturer(filter: string) {
    this.search.manufacturer = filter
    this.getWirelessBySearch(this.search)
  }

  settingFilterDeviceType(filter: string) {
    this.search.device_type = filter
    this.getWirelessBySearch(this.search)
  }

  goToUrl() {
    window.open('https://satprocess.com/broadbandAdmin/index.php/default/index', '_blank');
  }
}