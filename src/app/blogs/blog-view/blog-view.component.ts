import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { UploadPhotoService } from '../../../services/upload-photo/upload-photo.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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
  blog: any = {
    title: '',
    body: '',
    summary: '',
    featured_photo: '',
  };

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public blogSvc: BlogService,
    public uploadPhotoSvc: UploadPhotoService,
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
