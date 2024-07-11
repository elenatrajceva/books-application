import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {Observable, forkJoin, map} from 'rxjs';
import {parse} from 'csv-parse/browser/esm/sync';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  //The logic for fatching the data is done using observables, assuming that the data is expected to change dynamically

  constructor(private http: HttpClient) {}

  private getJSON(): Observable<any[]> {
    return this.http.get<any[]>('./assets/books.json');
  }

  private getCSV(): Observable<string> {
    return this.http.get('./assets/books.csv', { responseType: 'text' });
  }

  getBooks(): Observable<any[]> {
    return forkJoin([this.getJSON(), this.getCSV()]).pipe(
      map(([jsonBooks, csvData]) => {
        const csvBooks = parse(csvData, {columns: true});

        return this.mergeData(jsonBooks, csvBooks);
      })
    );
  }

  private mergeData(jsonBooks: any[], csvBooks: any[]): any[] {
    const bookMap = new Map<number, any>();

    jsonBooks.forEach(book => {
      if (!bookMap.has(book.id)) {
        bookMap.set(book.id, book);
      }
    });

    csvBooks.forEach(book => {
      if (!bookMap.has(Number(book.id))) {
        bookMap.set(Number(book.id), book);
      } 
    });

    return Array.from(bookMap.values());
  }
}
