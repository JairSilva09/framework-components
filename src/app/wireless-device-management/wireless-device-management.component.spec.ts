import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessDeviceManagementComponent } from './wireless-device-management.component';

describe('WirelessDeviceManagementComponent', () => {
  let component: WirelessDeviceManagementComponent;
  let fixture: ComponentFixture<WirelessDeviceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WirelessDeviceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WirelessDeviceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
