import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//Global Interceptor which will be applied to each request
@Injectable()
export class ErroInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    //Intercept the request with error events handlers
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => { //Catch the error response for further process
                    let errorMessage: any;
                    errorMessage = 'Unable to process the request!'; // Default error message
                    if (error.error instanceof ErrorEvent) {  // Handling the client side error events
                        errorMessage = `Error: ${error.error.message}`; //Updating the default error message with the new error message
                    }
                    else if (error instanceof HttpErrorResponse && error.status == 400) { //Handling the Server side error events
                        if ('non_field_errors' in error['error']) {
                            errorMessage = error['error']['non_field_errors'][0];
                        }
                        else {
                            errorMessage = error;
                        }
                    }
                    else if (error instanceof HttpErrorResponse && error.status == 401) { //Handling the Server side error events
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`; //Updating the default error message with the new error message
                        this.router.navigate(['login']);
                    } else if (error instanceof HttpErrorResponse && error.status == 402) { //Handling the Server side error events
                        if (error.error['detail'] == 'subscription_expired') {
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`; //Updating the default error message with the new error message
                            this.router.navigate(['customer/access/subscription/expired']);
                        }
                        else {
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`; //Updating the default error message with the new error message
                            this.router.navigate(['customer/access/subscription/accessdenied']);
                        }
                    }
                    return throwError(errorMessage);
                })
            )
    }
}
