import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLecteurComponent } from './register-lecteur.component';

describe('RegisterLecteurComponent', () => {
  let component: RegisterLecteurComponent;
  let fixture: ComponentFixture<RegisterLecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLecteurComponent]
    });
    fixture = TestBed.createComponent(RegisterLecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
