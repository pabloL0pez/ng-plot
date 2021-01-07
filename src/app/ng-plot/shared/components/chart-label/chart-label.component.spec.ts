import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLabelComponent } from './chart-label.component';

describe('ChartLabelComponent', () => {
  let component: ChartLabelComponent;
  let fixture: ComponentFixture<ChartLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
