import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogViewComponent } from './blogs/blog-view/blog-view.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
import { SuccessSnackbarComponent } from './snackbars/success-snackbar/success-snackbar.component';
import { SubmitDialogComponent } from './blogs/blog-view/shared/submit-dialog/submit-dialog.component';
import { DeleteDialogComponent } from './blogs/blog-view/shared/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogViewComponent,
    BlogCreateComponent,
    SuccessSnackbarComponent,
    SubmitDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    EditorModule,
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [
    SuccessSnackbarComponent,
    SubmitDialogComponent,
    DeleteDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
