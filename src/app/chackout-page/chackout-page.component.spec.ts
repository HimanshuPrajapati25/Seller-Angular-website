import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChackoutPageComponent } from './chackout-page.component';

describe('ChackoutPageComponent', () => {
  let component: ChackoutPageComponent;
  let fixture: ComponentFixture<ChackoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChackoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChackoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
