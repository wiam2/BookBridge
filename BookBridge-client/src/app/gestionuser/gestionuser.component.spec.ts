import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionuserComponent } from './gestionuser.component';

describe('GestionuserComponent', () => {
  let component: GestionuserComponent;
  let fixture: ComponentFixture<GestionuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionuserComponent]
    });
    fixture = TestBed.createComponent(GestionuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
