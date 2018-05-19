import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {

  blog: any = {
    title: '',
    featured_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGmSYY3V2aYgqSomToarQMUYcn8_wVWWrihsiqSJ8wH84F9Uo',
    body: '',
    summary: ''
  };

  constructor(
    public blogSvc: BlogService,
  ) {
    //
  }

  ngOnInit() {
    //
  }

  onSubmit() {
    console.log(this.blog);
    this.blogSvc.createBlog(this.blog).subscribe(
      res => {
        console.log(res);
    });
  }

}
