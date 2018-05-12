import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  tinyMCEAPI = 'p9slqf7osik2217tzddsw5zpf71wnz9zn1bqyrm0wppuyrnz';
  blog: any = {};

  constructor() {
    this.blog.title = 'Sample Title';
    this.blog.featured_photo = '';
    this.blog.body = '';
    this.blog.summary = '';
  }

  ngOnInit() {
  }

}
