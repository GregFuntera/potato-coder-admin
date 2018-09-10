import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { UploadPhotoService } from '../../../services/upload-photo/upload-photo.service';
import { YotubeVideoStatsService } from '../../../services/youtube-video-stats/yotube-video-stats.service';

import { MatDialog } from '@angular/material';
import { SubmitDialogComponent } from '../../dialogs/blog/submit-dialog/submit-dialog.component';
import { DeleteDialogComponent } from '../../dialogs/blog/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  tinyMCEAPI = 'p9slqf7osik2217tzddsw5zpf71wnz9zn1bqyrm0wppuyrnz';
  isLoading: boolean;
  isLoadingPhoto: boolean;
  isLoadingFetchStats: boolean = false;

  blog: any = {
    title: '',
    body: '',
    summary: '',
    featured_photo: '',
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
    public route: ActivatedRoute,
    public router: Router,
    public blogSvc: BlogService,
    public uploadPhotoSvc: UploadPhotoService,
    public youtubeVideoStatSvc: YotubeVideoStatsService,
    public matDialog: MatDialog) {
    //
  }

  ngOnInit() {
    this.blog._id = this.route.snapshot.paramMap.get('blogid');
    this.getBlog(this.blog._id);
  }

  getBlog(blogid: string) {
    this.isLoading = true;

    this.blogSvc.getBlog(blogid).subscribe(
      res => {
        console.log(res);
        this.blog = res;
        if (!this.blog.youtube_stats) {
          this.blog.youtube_stats = this.youtube_stats;
        }
        this.isLoading = false;
    });
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

  onBack() {
    this.autoSave();
  }

  autoSave() {
    this.blogSvc.updateBlog(this.blog._id, this.blog).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/blog']);
    });
  }


  onSubmit() {
    this.openDialog(SubmitDialogComponent);
  }

  onDelete() {
    this.openDialog(DeleteDialogComponent);
  }

  openDialog(component: any) {
    this.matDialog.open(component, {
      width: '350px',
      data: this.blog,
    });
  }

}
