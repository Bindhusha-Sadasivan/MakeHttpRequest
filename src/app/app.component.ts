import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json', postData).subscribe(
      responseData => console.log(responseData)
    )
  }

  onFetchPosts() {
    // Send Http request
    this.http.get('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json')
    .pipe(
      map(
        responseData => {
          const receivedData:any=[];
          for(let data in responseData)
          {
            if(responseData.hasOwnProperty(data))
            {
              receivedData.push({...responseData, id:data})
            }
          }
        }
      )
    )

    .subscribe(
      posts => console.log(posts)
    )
  }

  onClearPosts() {
    // Send Http request
  }
}
