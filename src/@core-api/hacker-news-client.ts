import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const HACKER_NEWS_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const instance = axios.create({
  baseURL: HACKER_NEWS_BASE_URL,
  timeout: 30000, // 30 sec
});

/**
 * DON'T do this!!! Just a simplify version of error handling here
 *
 * In real life we need to handle the error in each feature view/redux state,
 * usually we will have more custom error base on server code
 */
const generateError = async (): Promise<Error> => {
  const {isInternetReachable, isConnected} = await NetInfo.fetch();

  if (!isConnected || !isInternetReachable) {
    return new Error('Please check your internet connection.');
  }

  return new Error('Something went wrong. Please try later.');
};

const getHackerNewsItem = async (id: number) => {
  try {
    const {data: item} = await instance.get<HackerNewsItem>(`/item/${id}.json`);
    return item;
  } catch (_) {
    throw await generateError();
  }
};

const getHackerNewsItemByIds = async (ids: number[]) => {
  const jobs = ids.map(id => getHackerNewsItem(id));
  return await Promise.all(jobs);
};

export const HackerNewsClient = {
  getTopStoriesIds: async () => {
    try {
      const {data: ids} = await instance.get<number[]>('/topstories.json');
      return ids;
    } catch (_) {
      throw await generateError();
    }
  },
  getHackerNewsItem,
  getHackerNewsItemByIds,
};
