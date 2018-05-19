import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const accessTokens = '772d958afd628e62f1630100295bd5d1975bb2f9';
const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessTokens })
};

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  IMGUR_API = 'https://api.imgur.com/3';

  constructor(
    public http: HttpClient
  ) {
    //
  }

  uploadBlogFaturedPhoto(body: any): Observable<any> {
    console.log(body);
    return this.http.post(this.IMGUR_API + '/image', body, httpOptions);
  }

  createBodyResponse(base64Image: string, file: File) {
    const body = {
      image: base64Image,
      title: file.name,
      description: file.name,
      name: file.name,
      type: file.type,
    };
    return body;
  }

}
