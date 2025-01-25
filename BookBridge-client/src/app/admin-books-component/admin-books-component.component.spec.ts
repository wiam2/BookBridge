import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBooksComponentComponent } from './admin-books-component.component';

describe('AdminBooksComponentComponent', () => {
  let component: AdminBooksComponentComponent;
  let fixture: ComponentFixture<AdminBooksComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBooksComponentComponent]
    });
    fixture = TestBed.createComponent(AdminBooksComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
