import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  getBlog(blogid: string) {
    return this.http.get(this.apiURL + this.BASE_URL + '/' + blogid);
  }

  updateBlog(blogid: string, blog: any) {
    return this.http.put(this.apiURL +  this.BASE_URL + '/' + blogid, blog);
  }
}
