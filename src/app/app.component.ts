import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { Post } from './post.model';
import { CommonModule } from '@angular/common';

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


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http.post('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json', postData).subscribe(
      responseData => console.log(responseData)
    )
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.http.get<{[key:string] : Post}>('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json')
    .pipe(
      map(
        (responseData) => {
          const receivedData:Post[]=[];
          for(let data in responseData)
          {
            if(responseData.hasOwnProperty(data))
            {
              receivedData.push({...responseData[data], id:data})
            }
          }
          return receivedData;
        }
      )
    )
    .subscribe(
      posts => {
      this.isFetching = false
        console.log(posts);
        console.log(posts[0].content);
        console.log(posts[0].title);
        console.log(posts[0].id);
        this.loadedPosts = posts;
      }
    )
  }

  onClearPosts() {
    // Send Http request
  }
}
