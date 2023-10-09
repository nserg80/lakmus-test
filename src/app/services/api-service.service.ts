import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { mockData } from './mockData';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://global.lakmus.org';

  constructor(private http: HttpClient) { }

  getDiagnoses(): Observable<any[]> {
    const url = `${this.apiUrl}/Dictionaries/icpc2?IsPublic=true`;
    return of(mockData);
    
    // TODO: has been blocked by CORS
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }
}
