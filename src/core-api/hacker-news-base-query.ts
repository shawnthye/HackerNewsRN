import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {HACKER_NEWS_BASE_URL} from './hacker-news-client';

/**
 * Home screen with a list of top items displayed in order (https://hackernews.firebaseio.com/v0/topstories.json), and can be pulled to refresh.
 * Item screen with a list of comments (e.g. https://hacker-news.firebaseio.com/v0/item/2921983.json) and all their replies.
 */

export const HackerNewsBaseQuery = fetchBaseQuery({
  baseUrl: HACKER_NEWS_BASE_URL,
});
