import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'https://api.meka.do/api/v2';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  constructor(private _zone: NgZone) {}
  getServerSentEvent(query: string): Observable<any> {
    return Observable.create((observer: any) => {
      const eventSource = this.getEventSource(`${url}/${query}`);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(next: string): EventSource {
    return new EventSource(next);
  }
}
