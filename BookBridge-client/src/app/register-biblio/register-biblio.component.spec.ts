import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBiblioComponent } from './register-biblio.component';

describe('RegisterBiblioComponent', () => {
  let component: RegisterBiblioComponent;
  let fixture: ComponentFixture<RegisterBiblioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBiblioComponent]
    });
    fixture = TestBed.createComponent(RegisterBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
