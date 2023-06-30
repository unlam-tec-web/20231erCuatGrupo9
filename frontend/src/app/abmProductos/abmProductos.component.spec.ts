import { ComponentFixture, TestBed } from '@angular/core/testing';

import { abmProductosComponent } from './abmProductos.component';

describe('SignUpComponent', () => {
  let component: abmProductosComponent;
  let fixture: ComponentFixture<abmProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [abmProductosComponent]
    });
    fixture = TestBed.createComponent(abmProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
