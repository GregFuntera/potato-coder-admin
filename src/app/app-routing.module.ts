import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogViewComponent } from './blogs/blog-view/blog-view.component';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:blogid', component: BlogViewComponent },
  { path: 'blog/newblog/create', component: BlogCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
