import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookslistComponent } from './bookslist.component';

describe('BookslistComponent', () => {
  let component: BookslistComponent;
  let fixture: ComponentFixture<BookslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookslistComponent]
    });
    fixture = TestBed.createComponent(BookslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
