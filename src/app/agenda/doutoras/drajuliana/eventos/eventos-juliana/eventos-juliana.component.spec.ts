import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosJulianaComponent } from './eventos-juliana.component';

describe('EventosJulianaComponent', () => {
  let component: EventosJulianaComponent;
  let fixture: ComponentFixture<EventosJulianaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosJulianaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosJulianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
