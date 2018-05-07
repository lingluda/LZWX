import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechdeptComponent } from './techdept.component';

describe('TechdeptComponent', () => {
  let component: TechdeptComponent;
  let fixture: ComponentFixture<TechdeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechdeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
