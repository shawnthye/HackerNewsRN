import axios from 'axios';

export const HACKER_NEWS_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const instance = axios.create({
  baseURL: HACKER_NEWS_BASE_URL,
  timeout: 1000,
});

export const HackerNewsClient = {
  getTopStoriesIds: async () => {
    const {data: ids} = await instance.get<number[]>('/topstories.json');
    return ids;
  },
  getStory: async (id: number) => {
    const {data: story} = await instance.get<Story>(`/item/${id}.json`);
    return story;
  },
};
