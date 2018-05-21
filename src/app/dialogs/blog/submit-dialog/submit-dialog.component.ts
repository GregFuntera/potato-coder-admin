import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackbarComponent } from '../../../snackbars/success-snackbar/success-snackbar.component';
import { BlogService } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss']
})
export class SubmitDialogComponent implements OnInit {

  blog: any;

  constructor(
    public blogSvc: BlogService,
    public matSnackbar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<SubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blog = this.data;
  }

  ngOnInit() {
   //
  }

  onSave() {
    this.blog.is_published = true;
    this.blogSvc.updateBlog(this.blog._id, this.blog).subscribe(
      res => {
        console.log(res);
        if (res._id) {
          this.dialogRef.close();
          this.operationSuccess();
        }
    });
  }

  operationSuccess() {
    this.navigateTo('blog').then(() => {
      this.showSnackbar(SuccessSnackbarComponent, 3000);
    });
  }

  showSnackbar(component: any, duration: number) {
    this.matSnackbar.openFromComponent(component, {
      duration: duration,
      verticalPosition: 'top',
    });
  }

  navigateTo(url: string): Promise<any> {
    return this.router.navigate(['/' + url]);
  }
}
