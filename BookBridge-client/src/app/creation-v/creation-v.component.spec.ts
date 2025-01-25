import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationVComponent } from './creation-v.component';

describe('CreationVComponent', () => {
  let component: CreationVComponent;
  let fixture: ComponentFixture<CreationVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationVComponent]
    });
    fixture = TestBed.createComponent(CreationVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
