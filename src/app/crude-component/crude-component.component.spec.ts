import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudeComponentComponent } from './crude-component.component';

describe('CrudeComponentComponent', () => {
  let component: CrudeComponentComponent;
  let fixture: ComponentFixture<CrudeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
