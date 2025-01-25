import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceBiblioComponent } from './espace-biblio.component';

describe('EspaceBiblioComponent', () => {
  let component: EspaceBiblioComponent;
  let fixture: ComponentFixture<EspaceBiblioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceBiblioComponent]
    });
    fixture = TestBed.createComponent(EspaceBiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
