import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SuccessSnackbarComponent } from '../../../snackbars/success-snackbar/success-snackbar.component';
import { BlogService } from '../../../../services/blog/blog.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  blog: any;

  constructor(
    public blogSvc: BlogService,
    public matSnackbar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.blog = this.data;
  }

  ngOnInit() {
    console.log(this.blog);
  }

  onDelete() {
    this.blogSvc.deleteBlog(this.blog._id).subscribe(
      res => {
        console.log(res);
        if (res === null) {
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
