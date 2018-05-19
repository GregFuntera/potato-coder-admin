import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const accessTokens = '772d958afd628e62f1630100295bd5d1975bb2f9';
const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessTokens })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiURL = environment.apiURL;
  BASE_URL = '/blog';

  constructor(
    public http: HttpClient
  ) {}


  getBlogs(): Observable<any> {
    return this.http.get(this.apiURL + this.BASE_URL);
  }

  getBlog(blogid: string): Observable<any> {
    return this.http.get(this.apiURL + this.BASE_URL + '/' + blogid);
  }

  updateBlog(blogid: string, blog: any): Observable<any> {
    return this.http.put(this.apiURL +  this.BASE_URL + '/' + blogid, blog)
      .pipe(
        catchError(this.handleError)
      );
  }

  createBlog(blog: any): Observable<any> {
    return this.http.post(this.apiURL + this.BASE_URL, blog);
  }

  deleteBlog(blogid: string): Observable<any> {
    return this.http.delete(this.apiURL + this.BASE_URL + '/' + blogid)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error Handlers
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.errors}`);
    // }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
