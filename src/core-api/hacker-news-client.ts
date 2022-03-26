import axios from 'axios';

export const HACKER_NEWS_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const instance = axios.create({
  baseURL: HACKER_NEWS_BASE_URL,
  timeout: 1000,
});

const getHackerNewsItem = async (id: number) => {
  const {data: item} = await instance.get<HackerNewsItem>(`/item/${id}.json`);
  return item;
};

const getHackerNewsItemByIds = async (ids: number[]) => {
  const jobs = ids.map(id => getHackerNewsItem(id));
  return await Promise.all(jobs);
};

export const HackerNewsClient = {
  getTopStoriesIds: async () => {
    const {data: ids} = await instance.get<number[]>('/topstories.json');
    return ids;
  },
  getHackerNewsItem,
  getHackerNewsItemByIds,
};
