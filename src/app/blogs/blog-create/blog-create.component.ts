import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { YotubeVideoStatsService } from '../../../services/youtube-video-stats/yotube-video-stats.service';

import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from '../../dialogs/blog/create-dialog/create-dialog.component';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackbarComponent } from '../../snackbars/success-snackbar/success-snackbar.component';
import { UploadPhotoService } from '../../../services/upload-photo/upload-photo.service';


@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {

  isLoadingPhoto: boolean;
  isLoadingFetchStats: boolean = false;

  blog: any = {
    title: '',
    featured_photo: '',
    body: '',
    summary: ''
  };

  youtube_stats: any = {
    youtube_id: '',
    comment_count: 0,
    dislike_count: 0,
    favorite_count: 0,
    like_count: 0,
    view_count: 0,
  };

  youtubeStatsError: string;

  constructor(
    public blogSvc: BlogService,
    public uploadPhotoSvc: UploadPhotoService,
    public youtubeVideoStatSvc: YotubeVideoStatsService,
    public matDialog: MatDialog,
    public matSnackbar: MatSnackBar,
    public router: Router
  ) {
    //
  }

  ngOnInit() {
    this.blog.youtube_stats = this.youtube_stats;
  }

  onUploadFeaturedPhoto(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.prepareUploadPhoto(file);
  }

  prepareUploadPhoto(file: File) {
    const fileReader = new FileReader();
    fileReader.onloadend = (readerEvt: any) => {
      const type = file.type;
      const image = fileReader.result.split('data:' + type + ';base64,')[1];
      const body = this.uploadPhotoSvc.createBodyResponse(image, file);
      this.uploadFeaturedPhoto(body);
    };
    fileReader.readAsDataURL(file);
  }

  uploadFeaturedPhoto(body: any) {
    this.isLoadingPhoto = true;
    this.uploadPhotoSvc.uploadBlogFaturedPhoto(body).subscribe(
      res => {
        console.log(res);
        this.blog.featured_photo = res.data.link;
        this.isLoadingPhoto = false;
    });
  }


  getVideoStats(videoID) {
    this.isLoadingFetchStats = true;
    this.youtubeVideoStatSvc.getStatistics(videoID).subscribe(
      res => {
        console.log(res);
        let items = res.items[0];
        let isThereError = !items ? true : false;
        if (items) {
          let statistics = items.statistics;
          this.blog.youtube_stats = this.mapYoutubeStas(videoID, statistics);
        } else {
          this.blog.youtube_stats = this.mapYoutubeStas('', this.youtube_stats);
        }
        this.getYoutubeStatsError(isThereError);
        this.isLoadingFetchStats = false;
    });
  }

  getYoutubeStatsError(error) {
    this.youtubeStatsError = error === true ? 'Youtube video not found..' : '';
  }

  mapYoutubeStas(videoID, statistics) {
    let youtube_stats = {
      youtube_id: '',
      comment_count: 0,
      dislike_count: 0,
      favorite_count: 0,
      like_count: 0,
      view_count: 0,
    };
    youtube_stats.youtube_id = videoID;
    youtube_stats.comment_count = statistics.commentCount;
    youtube_stats.dislike_count = statistics.dislikeCount;
    youtube_stats.favorite_count = statistics.favoriteCount;
    youtube_stats.like_count = statistics.likeCount;
    youtube_stats.view_count = statistics.viewCount;
    return youtube_stats;
  }

  onSubmit() {
    /**
     * TODO
     * FIX Validations
     */
    this.openDialog(CreateDialogComponent, this.blog);
    // if (this.isFormValid().valid) {
    // } else {
    //   this.openDialog(GenericDialogComponent, {
    //     message: `${this.isFormValid().missing} is missing.`
    //   });
    //   console.log(this.isFormValid().valid, this.isFormValid().missing);
    // }
  }

  isFormValid(): any {
    const data = {
      valid: true,
      missing: '',
    };
    for (let key in this.blog) {
      if (!this.blog[key].length) {
        console.log(key, this.blog[key]);
        data.valid = false;
        data.missing = key;
        break;
      }
    }
    return data;
  }

  onSave() {
    this.blogSvc.createBlog(this.blog).subscribe(
      res => {
        console.log(res);
        if (res._id) {
          this.operationSuccess();
        }
    });
  }

  operationSuccess() {
    this.navigateTo('blog').then(() => {
      this.showSnackbar(SuccessSnackbarComponent, 3000);
    });
  }

  openDialog(component: any, data: any) {
    this.matDialog.open(component, {
      data: data,
      width: '350px'
    });
  }

  navigateTo(url: string): Promise<any> {
    return this.router.navigate(['/' + url]);
  }

  showSnackbar(component: any, duration: number) {
    this.matSnackbar.openFromComponent(component, {
      duration: duration,
      verticalPosition: 'top',
    });
  }
}
