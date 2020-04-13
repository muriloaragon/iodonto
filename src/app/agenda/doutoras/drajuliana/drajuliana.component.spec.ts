import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrajulianaComponent } from './drajuliana.component';

describe('DrajulianaComponent', () => {
  let component: DrajulianaComponent;
  let fixture: ComponentFixture<DrajulianaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrajulianaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrajulianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
