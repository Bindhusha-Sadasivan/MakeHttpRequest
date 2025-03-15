import { HttpEventType, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
   console.log("Logging request is sending");
    console.log("Logging Request Url:" + req.url);
    console.log("Request header:"+ req.headers);
      const modifiedUrl = req.clone({headers: new HttpHeaders({
      "content-data" : "Recipies content"
    })})
    return next(modifiedUrl)
    .pipe(tap((event:any) => {
      console.log(event);
      if(event.type === HttpEventType.Response){
        console.log("Response Arrived, Body Data:");
        console.log(event.body)
      }
    }));
};
