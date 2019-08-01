import { Injectable } from "@angular/core";
import { tap, map, catchError } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    accessToken;
    constructor(public route: Router) {
        this.accessToken = localStorage.getItem('curruntUserToken')
    }
    //function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log("token=================>", this.accessToken)
        //how to update the request Parameters
        if (this.accessToken) {
            const cloned = request.clone({
                headers: request.headers.set("token",
                    this.accessToken)
            });
            //logging the updated Parameters to browser's console
            console.log("Before making api call : ", cloned);
            return next.handle(cloned).pipe(
                map((event: HttpResponse<any>) => {

                    console.log("in response===========>", event);
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log("interceptorsssssssss error by meeeeeeeeeee", error);
                    const errorMessage = error.error;
                    console.log("error in interceptor", errorMessage);
                    if (error.status === 401) {
                        localStorage.removeItem('curruntUserToken');
                        //   Swal.fire({
                        //     type: 'error',
                        //     title: "sorry" + errorMessage,
                        //     showConfirmButton: false,
                        //     timer: 2000
                        //   })
                        this.route.navigate(['/login']);
                    }
                    return throwError(errorMessage);
                })
            );
        } else {
            return next.handle(request).pipe(
                // tap(
                //     event => {
                //         //logging the http response to browser's console in case of a success
                //         if (event instanceof HttpResponse) {
                //             console.log("api call success :", event);
                //         }
                //     },
                //     error => {
                //         //logging the http response to browser's console in case of a failuer
                //         if (event instanceof HttpResponse) {
                //             console.log("api call error :", event);
                //         }
                //     }
                // )
                map((event: HttpResponse<any>) => {

                    console.log("in response===========>", event);
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log("interceptorsssssssss error by meeeeeeeeeee", error);
                    const errorMessage = error.error;
                    console.log("error in interceptor", errorMessage);
                    if (error.status === 401) {
                        localStorage.removeItem('curruntUserToken');
                        //   Swal.fire({
                        //     type: 'error',
                        //     title: "sorry" + errorMessage,
                        //     showConfirmButton: false,
                        //     timer: 2000
                        //   })
                        this.route.navigate(['/login']);
                    }
                    return throwError(errorMessage);
                })
            );
        }
    }
}


