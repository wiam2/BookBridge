import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpruntComponent } from './admin-emprunt.component';

describe('AdminEmpruntComponent', () => {
  let component: AdminEmpruntComponent;
  let fixture: ComponentFixture<AdminEmpruntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEmpruntComponent]
    });
    fixture = TestBed.createComponent(AdminEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
