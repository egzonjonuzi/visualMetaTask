import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {DataModel} from '../models/data.model';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  private categoriesTextPath = 'assets/categories.txt';
  private txt: DataModel[] = [];

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  /**
   * Handle request's and support with mock data.
   * @param req
   * @param next
   */
  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith('/') && method === 'GET') {
      req = req.clone({
        url: this.categoriesTextPath
      });
      return this.handleJsonResponse(req, next);
    }
    if (url.endsWith('/api/categories') && method === 'GET') {
      req = req.clone({
        url: this.categoriesTextPath,

      });
      return of(new HttpResponse({ status: 200, body: this.search(req.params.get('q')) })).pipe(delay(500));
    }
    if (url.endsWith('/api/categories') && method === 'POST') {
      const { body } = req.clone();
      return of(new HttpResponse({body: this.addCategory(body.categoryValue) })).pipe(delay(500));
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
  private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
    // Override the responseType to disable the default JSON parsing.
    httpRequest = httpRequest.clone({responseType: 'text'});
    // Handle the response using the custom parser.
    return next.handle(httpRequest).pipe(map((event: HttpResponse<any>) => {

      if (event instanceof HttpResponse && typeof event.body === 'string') {
        return event.clone({body: this.loadData(event.body)});
      } else {
        return event;
      }

    }));
  }

  search(q: string): any {
    const data = this.txt.filter(x => x.items.some(g => g.toLowerCase().includes(q.toLowerCase())));
    return data;
  }


  loadData(txt: string): void {
    const rows = txt.split('\n');
    rows.forEach((i, n, array) => {
      const id = i.split('-');
      const items = id[1].split('>');
      const data = new DataModel();
      data.id = parseInt(id[0].trim());
      data.items = [];
      data.items = items.map(value => {
        return value.trim();
      });
      this.txt.push(data);
      }
    );
  }

  addCategory(data): number {
    data = data.split('-');
    if (!isNaN(data[0]) && data[1].split('>').length > 1) {
        const newEntry = new DataModel();
        newEntry.id = parseInt(data[0].trim());
        newEntry.items = data[1].split('>').map(value => {
          return value.trim();
        });
        this.txt.push(newEntry);

        return 200;
    } else {
      return 500;
    }

  }


}

/**
 * Mock backend provider definition for app.module.ts provider.
 */
export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
