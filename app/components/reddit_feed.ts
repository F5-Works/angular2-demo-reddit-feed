import {Component} from 'angular2/core';
import {Observable} from 'rxjs';
import {Http} from 'angular2/http';
import {ImageReddit} from './reddit_feed.models';

@Component({
  selector: 'reddit-feed',
  templateUrl: 'app/components/reddit_feed.html',
  styleUrls: ['app/components/reddit_feed.css'],
  providers: []
})
export class RedditFeed {

  private _reddits$: Observable<Array<ImageReddit>>;
  private _redditDataUrl: string = 'http://www.reddit.com/r/9gag.json';

  constructor(private _http: Http) {
  }

  ngOnInit() {
    this._initFeed();
    this._logFeed();
  }

  private _initFeed() {
    this._reddits$ = this._http.get(this._redditDataUrl)
      .map(response => response.json())
      .map(json => <Array<any>>json.data.children)
      .map(children => children.filter(d => (
        ['png', 'jpg'].indexOf(d.data.url.split('.').pop()) != -1
      )))
      .map(children => children.map(d => new ImageReddit(d.data.id, d.data.title, d.data.url)));
  }
  private _logFeed() {
    this._reddits$.subscribe(data => console.debug('data', data));
  }
}
