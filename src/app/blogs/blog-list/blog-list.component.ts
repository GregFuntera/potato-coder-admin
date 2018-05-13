import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: any[];
  isLoading: boolean;

  constructor(
    public router: Router,
    public blogSvc: BlogService,
  ) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.isLoading = true;
    this.blogSvc.getBlogs().subscribe(
      res => {
        this.blogs = res;
        this.isLoading = false;
        console.log(this.blogs);
        this.isLoading = false;
    });
  }

  onCreate() {
    this.router.navigate(['/blog/blogview']);
  }

}
