import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

enum HttpMethods {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE',
    options = 'OPTIONS'
}

export interface ApiGateway {

  request(url: string, method: HttpMethods, body: any) : any;

}

@Injectable()
export class ApiGateway implements ApiGateway {
    private headers: any =
    {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
        
    constructor(private http: HttpClient) {
    }

    /**
     * Generalized handler for http requests 
     * @param url 
     * @param method 
     * @param body 
     * @returns 
     */
    public request(url: string, method: any, body?: any) : any {
        const req = new HttpRequest(method, url);
        return this.http.request(req).pipe(
            map((resp) => {
                return resp;
            })
        );
    }

 
    /**
     * Handler for a GET request
     * @param url 
     * @param config 
     * @param silenceError 
     * @returns 
     */
    public get(url: string, config?: any, silenceError?: boolean): Observable<any> {
        const reqObservable = this.http.get(url, config);
        return this.processResponse(reqObservable, silenceError);
    }

    /**
     * Handler for POST method
     * @param url 
     * @param payload 
     * @param processPayload 
     * @param headerObject 
     * @param silenceError 
     * @returns 
     */
    public post(url: string, payload: any, processPayload = true, headerObject : any, silenceError?: boolean) {

        let reqObservable;
        let header : any = {...this.headers, ...headerObject };
        if (headerObject['Content-Type'] && headerObject['Content-Type'] === 'multipart/form-data') {
            header = {};
        }
        reqObservable = this.http.post(url, payload, {
            headers: new HttpHeaders(header)
        });
        return this.processResponse(reqObservable, silenceError);
    }

    /**
     * Function for PUT request
     * @param url 
     * @param payload 
     * @param processPayload 
     * @param silenceError 
     * @returns 
     */
    public put(url: string, payload: any, processPayload = true, silenceError?: boolean) {
        const reqObservable = this.http.put(url, payload, {
        headers: this.headers,
        });
        return this.processResponse(reqObservable, silenceError);
    }

    /**
     * Method to handle DELETE method
     * @param url 
     * @param silenceError 
     * @returns 
     */
    public delete(url: string, silenceError?: boolean) {
        const reqObservable = this.http.post(url, null);
        return this.processResponse(reqObservable, silenceError);
    }

 
    /**
     * Private method to process the response from the API call
     * @param obs 
     * @param silenceErrors 
     * @returns 
     */
    private processResponse(obs : any, silenceErrors: boolean = false): Observable<any> {
        return obs.pipe(
            catchError( (error: HttpErrorResponse) => {
                return this.handleError.call(this,error, silenceErrors);
            })
        );
    } 

 
    /**
     * Error handler for the API triggerring
     * @param error 
     * @param silenceError 
     * @returns 
     */
    private handleError(error: HttpErrorResponse, silenceError: boolean): Observable<never> {
        let errorCode;
        let errorStatus;
        const errorItem = error && error.error && error.error.length ? error.error[0] : null;
        if (errorItem) {
        errorCode = errorItem.code;
        errorStatus = errorItem.desc;
        }
        return throwError (errorCode + ':' + errorStatus);

    }
}
