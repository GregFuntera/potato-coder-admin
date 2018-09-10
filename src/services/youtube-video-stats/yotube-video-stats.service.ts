import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YotubeVideoStatsService {
  YOTUBE_VIDEO_API = 'https://www.googleapis.com/youtube/v3/videos?part=statistics';
  API_KEY = 'AIzaSyBOlzQFDSuTmTpHlQeyzKPQaBrSyK4CFgQ';

  constructor(private http: HttpClient) { }

  getStatistics(videoID): Observable<any> {
    return this.http.get(this.YOTUBE_VIDEO_API + '&id=' + videoID + '&key=' + this.API_KEY);
  }
}
