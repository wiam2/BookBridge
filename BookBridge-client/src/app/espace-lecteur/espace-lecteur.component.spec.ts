import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceLecteurComponent } from './espace-lecteur.component';

describe('EspaceLecteurComponent', () => {
  let component: EspaceLecteurComponent;
  let fixture: ComponentFixture<EspaceLecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceLecteurComponent]
    });
    fixture = TestBed.createComponent(EspaceLecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
