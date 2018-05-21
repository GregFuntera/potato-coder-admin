import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CreateDialogComponent } from '../../dialogs/blog/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from '../../dialogs/blog/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackbarComponent } from '../../snackbars/success-snackbar/success-snackbar.component';
import { UploadPhotoService } from '../../../services/upload-photo/upload-photo.service';
import { GenericDialogComponent } from '../../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {

  isLoadingPhoto: boolean;
  blog: any = {
    title: '',
    featured_photo: '',
    body: '',
    summary: ''
  };

  constructor(
    public blogSvc: BlogService,
    public uploadPhotoSvc: UploadPhotoService,
    public matDialog: MatDialog,
    public matSnackbar: MatSnackBar,
    public router: Router
  ) {
    //
  }

  ngOnInit() {
    //
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

  onSubmit() {
    if (this.isFormValid().valid) {
      this.openDialog(CreateDialogComponent, this.blog);
    } else {
      this.openDialog(GenericDialogComponent, {
        message: `${this.isFormValid().missing} is missing.`
      });
      console.log(this.isFormValid().valid, this.isFormValid().missing);
    }
  }

  isFormValid(): any {
    const data = {
      valid: true,
      missing: '',
    };
    for (let key in this.blog) {
      if (!this.blog[key].length) {
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
