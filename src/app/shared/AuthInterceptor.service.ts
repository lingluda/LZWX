import {ProductService} from './product.service';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ProductService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === `login`) {

      return next.handle(req).do(event => {
        if (event instanceof HttpResponse) {
          this.router.navigate(['list']);

        }
      });
    } else if (localStorage.getItem('header') === null) {
      this.router.navigate(['login']);
    }  else {

      const jwt = localStorage.getItem("header");
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', jwt)
      });

      return next.handle(clonedRequest).do(event => {

        if (event instanceof HttpResponse) {

          if (event.status === 404) {
            this.router.navigate(['list']);
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.router.navigate(['login']);
          }
        }
        }
      );
    }
  }
}
