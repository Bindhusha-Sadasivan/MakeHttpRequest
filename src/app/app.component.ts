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
  error:any=null;


  constructor(private http: HttpClient, private postService:PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post):any {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content).subscribe(
      (responseData:any) => console.log(responseData))
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
      }
    );

  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    })
  }
}



// Using Suject
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';
// import { Post } from './post.model';
// import { CommonModule } from '@angular/common';
// import { PostService } from './post.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, FormsModule, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   loadedPosts: Post[] = [];
//   isFetching = false;

//   constructor(private postService: PostService) {}

//   ngOnInit() {
//     this.isFetching = true;
//     this.postService.fetchPosts();
//     this.postService.getPostsUpdateListener().subscribe(posts => {
//       this.isFetching = false;
//       this.loadedPosts = posts;
//     });
//   }

//   onCreatePost(postData: Post) {
//     this.postService.createAndStorePost(postData.title, postData.content);
//   }

//   onFetchPosts() {
//     this.isFetching = true;
//     this.postService.fetchPosts();
//     // this.postService.getPostsUpdateListener().subscribe(posts => {
//     //   this.isFetching = false;
//     //   this.loadedPosts = posts;
//     // });
//   }
//   onClearPosts() {
//         // Send Http request
//       }
// }
