import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  createAndStorePost(title:string, content:string){
    const postDatas = {title : title, content:content};
    return this.http.post('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json', postDatas);
  }

  fetchPost(){
    return this.http.get<{[key:string] : Post}>('https://ng-recipies-web-api-default-rtdb.firebaseio.com/post.json')
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

  }
}
