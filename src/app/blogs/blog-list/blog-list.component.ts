import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  publishedBlogs: any[];
  unPublishedBlogs: any[];
  isLoading: boolean;

  constructor(
    public router: Router,
    public blogSvc: BlogService,
  ) { }

  ngOnInit() {
    this.getPublishedBlogs();
    this.getUnpublishedBlogs();
  }

  getPublishedBlogs() {
    this.isLoading = true;

    this.blogSvc.getBlogs(true).subscribe(
      res => {
        this.publishedBlogs = res;
        this.isLoading = false;
        console.log(this.publishedBlogs);
        this.isLoading = false;
    });
  }

  getUnpublishedBlogs() {
    this.isLoading = true;

    this.blogSvc.getBlogs(false).subscribe(
      res => {
        this.unPublishedBlogs = res;
        this.isLoading = false;
        console.log(this.unPublishedBlogs);
        this.isLoading = false;
    });
  }

}
