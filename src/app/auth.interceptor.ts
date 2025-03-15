import { HttpEventType, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("request is sending");
  console.log("Request Url:" + req.url);
  const modifiedUrl = req.clone({headers: new HttpHeaders({
    "content-type" : "Recipies Request"
  })})
  return next(modifiedUrl)
  // .pipe(tap((event:any) => {
  //   console.log(event);
  //   if(event.type === HttpEventType.Response){
  //     console.log("Response Arrived, Body Data:");
  //     console.log(event.body)
  //   }
  // }));
};
