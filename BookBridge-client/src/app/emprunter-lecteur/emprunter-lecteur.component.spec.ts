import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprunterLecteurComponent } from './emprunter-lecteur.component';

describe('EmprunterLecteurComponent', () => {
  let component: EmprunterLecteurComponent;
  let fixture: ComponentFixture<EmprunterLecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmprunterLecteurComponent]
    });
    fixture = TestBed.createComponent(EmprunterLecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
