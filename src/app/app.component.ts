import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { Post } from './post.model';
import { CommonModule } from '@angular/common';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadedPosts:Post[]= [];
  isFetching:boolean = false;


  constructor(private http: HttpClient, private postService:PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content)

  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost();

  }

  onClearPosts() {
    // Send Http request
  }
}
