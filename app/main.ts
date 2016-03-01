import {bootstrap}  from 'angular2/platform/browser';
import {RedditFeed} from './components/reddit_feed';
import {HTTP_PROVIDERS} from 'angular2/http';

import 'rxjs/add/operator/map';

bootstrap(RedditFeed, [...HTTP_PROVIDERS]).catch(err => console.error(err));

