import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class AppMaterialModule { }
