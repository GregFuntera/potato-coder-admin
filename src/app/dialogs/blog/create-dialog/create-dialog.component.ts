import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackbarComponent } from '../../../snackbars/success-snackbar/success-snackbar.component';
import { BlogService } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  blog: any;

  constructor(
    public blogSvc: BlogService,
    public matSnackbar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blog = data;
  }

  ngOnInit() {
  }

  onSave() {
    this.blog.is_published = true;
    this.blogSvc.createBlog(this.blog).subscribe(
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
