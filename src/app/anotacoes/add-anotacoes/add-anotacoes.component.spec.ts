import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnotacoesComponent } from './add-anotacoes.component';

describe('AddAnotacoesComponent', () => {
  let component: AddAnotacoesComponent;
  let fixture: ComponentFixture<AddAnotacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnotacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
