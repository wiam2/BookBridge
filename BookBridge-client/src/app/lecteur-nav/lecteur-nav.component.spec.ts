import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecteurNAvComponent } from './lecteur-nav.component';

describe('LecteurNAvComponent', () => {
  let component: LecteurNAvComponent;
  let fixture: ComponentFixture<LecteurNAvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecteurNAvComponent]
    });
    fixture = TestBed.createComponent(LecteurNAvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
