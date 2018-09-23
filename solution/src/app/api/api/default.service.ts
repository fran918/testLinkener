/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';

import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { BigDecimal } from '../model/bigDecimal';

import { Reading } from '../model/reading';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class DefaultService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(
        protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    public readingGet(
        start?: Date,
        end?: Date,
        offset?: BigDecimal,
        limit?: BigDecimal,
        observe?: 'body',
        reportProgress?: boolean): Observable<Array<Reading>>;
    public readingGet(
        start?: Date,
        end?: Date,
        offset?: BigDecimal,
        limit?: BigDecimal,
        observe?: 'response',
        reportProgress?: boolean): Observable<HttpResponse<Array<Reading>>>;
    public readingGet(
        start?: Date,
        end?: Date,
        offset?: BigDecimal,
        limit?: BigDecimal,
        observe?: 'events',
        reportProgress?: boolean): Observable<HttpEvent<Array<Reading>>>;
    public readingGet(
        start?: Date,
        end?: Date,
        offset?: BigDecimal,
        limit?: BigDecimal,
        observe: any = 'body',
        reportProgress: boolean = false): Observable<any> {

        Date.prototype.toISOString = function () {
            const tzo = -this.getTimezoneOffset(),
                dif = tzo >= 0 ? '+' : '-',
                pad = function (num) {
                    const norm = Math.floor(Math.abs(num));
                    return (norm < 10 ? '0' : '') + norm;
                };
            return this.getFullYear() +
                '-' + pad(this.getMonth() + 1) +
                '-' + pad(this.getDate()) +
                'T' + pad(this.getHours()) +
                ':' + pad(this.getMinutes()) +
                ':' + pad(this.getSeconds());
        };

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

        if (start !== undefined && start !== null) {
            const dateStart = start.toISOString();

            queryParameters = queryParameters.set('start', <any>dateStart);
        }

        if (end !== undefined && end !== null) {
            const dateEnd = end.toISOString();

            queryParameters = queryParameters.set('end', <any>dateEnd);
        }

        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }

        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get(`${this.basePath}/reading`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates a reading&#x27;s values
     *
     * @param body the reading object to be updated.  Only value1 and value2 are updated, any modification on the timestamp is ignored.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */

    public readingPut(body: Reading, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public readingPut(body: Reading, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public readingPut(body: Reading, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public readingPut(body: Reading, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling readingPut.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        // tslint:disable-next-line:prefer-const
        let httpHeaderAccepts: string[] = [
        ];

        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put(`${this.basePath}/reading`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
