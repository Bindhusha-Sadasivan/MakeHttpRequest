import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>();

  constructor(private http:HttpClient) { }

  // createAndStorePost(title:string, content:string){
  //   const postDatas = {title : title, content:content};
  //   return this.http.post('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json', postDatas);
  // }

  createAndStorePost(title:string, content:string){
    const postDatas = {title : title, content:content};
    return this.http.post('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json', postDatas,
      {
        observe:'response'
      }
    )
    .subscribe(responseData => {console.log(responseData)},
              error => { this.error.next(error.message)});
  }

  fetchPost(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{[key:string] : Post}>('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json',
          {
            headers : new HttpHeaders ({
              'custom-headers' : 'Hello'
            }),
            // params : new HttpParams().set('print', 'pretty')
            params : searchParams
          }
    )
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
      ),
      catchError(errorResponse => {return throwError(errorResponse)})
    )

  }

  deletePost(){
    return this.http.delete('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json',
      {
        observe:'events'
      }
    ).pipe(tap((event:any) => console.log(event)));
  }
}


// Using Suject
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Post } from './post.model';
// import { BehaviorSubject } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private posts: Post[] = [];
//   private postsUpdated = new BehaviorSubject<Post[]>([]);

//   constructor(private http: HttpClient) {}

//   getPostsUpdateListener() {
//     return this.postsUpdated.asObservable();
//   }

//   createAndStorePost(title: string, content: string) {
//     const postData: Post = { title, content };

//     this.http.post<{ name: string }>(
//       'https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json',
//       postData
//     ).subscribe(responseData => {
//       const newPost: Post = { ...postData, id: responseData.name };
//       this.posts.push(newPost);
//       this.postsUpdated.next([...this.posts]);
//     });
//   }

//   fetchPosts() {
//     this.http.get<{ [key: string]: Post }>(
//       'https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json'
//     )
//     .pipe(
//       map(responseData => {
//         const fetchedPosts: Post[] = [];
//         for (let key in responseData) {
//           if (responseData.hasOwnProperty(key)) {
//             fetchedPosts.push({ ...responseData[key], id: key });
//           }
//         }
//         return fetchedPosts;
//       })
//     )
//     .subscribe(fetchedPosts => {
//       this.posts = fetchedPosts;
//       this.postsUpdated.next([...this.posts]);
//     });
//   }
// }
