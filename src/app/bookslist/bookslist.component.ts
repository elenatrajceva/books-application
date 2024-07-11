import {Component} from '@angular/core';

import {BookService} from 'src/services/book.service';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent {
  public books: Book[] = [];
  filteredBooks: Book[] = [];
  sortOption = 'author';

  constructor(
    private bookService: BookService
  ) {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = this.books;
      this.sortBooks()
    });
  }

  ngOnInit(): void {
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredBooks = this.books;
      this.sortBooks();
      return;
    }
    this.filteredBooks = this.books.filter((book) =>
      book?.author.toLowerCase().includes(text.toLowerCase()) ||
      book?.title.toLowerCase().includes(text.toLowerCase()) ||
      book?.genre.toLowerCase().includes(text.toLowerCase())
    );
    this.sortBooks();
  }

  sortBooks() {
    let sortedData;
    switch (this.sortOption) {
      case 'title':
        sortedData = [...this.filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        sortedData = [...this.filteredBooks].sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'genre':
        sortedData = [...this.filteredBooks].sort((a, b) => a.genre.localeCompare(b.genre));
        break;
      default:
        sortedData = this.filteredBooks;
        break;
    }
    this.filteredBooks = sortedData;
  }

  onSortOptionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
    this.sortBooks();
  }
}
