import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBiblioComponent } from './profil-biblio.component';

describe('ProfilBiblioComponent', () => {
  let component: ProfilBiblioComponent;
  let fixture: ComponentFixture<ProfilBiblioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilBiblioComponent]
    });
    fixture = TestBed.createComponent(ProfilBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
