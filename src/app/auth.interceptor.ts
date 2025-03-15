import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("request is sending")
  const modifiedUrl = req.clone({headers: new HttpHeaders({
    "content-type" : "Recipies Request"
  })})
  return next(modifiedUrl);
};
