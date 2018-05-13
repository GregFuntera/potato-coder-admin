import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  tinyMCEAPI = 'p9slqf7osik2217tzddsw5zpf71wnz9zn1bqyrm0wppuyrnz';
  blog: any = {};
  isLoading: boolean;

  constructor(
    public route: ActivatedRoute,
    public blogSvc: BlogService,
  ) {
    this.blog.title = 'Sample Title';
    this.blog.featured_photo = '';
    this.blog.body = '';
    this.blog.summary = '';
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

  onSubmit() {
    console.log(this.blog);
    this.blogSvc.updateBlog(this.blog._id, this.blog).subscribe(
      res => {
        console.log(res);
    });
  }

}
