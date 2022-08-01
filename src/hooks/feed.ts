import { useMutation, useQuery } from '@tanstack/react-query';

import { ExtractFnReturnType, FeedProps, useFeedsOptions } from '@/types';
import request from '@/utils/ky';

export const fetchFeeds = (): Promise<Array<FeedProps>> => {
	return request.get('/api/v1/feeds').json();
};

type QueryFnType = typeof fetchFeeds;

export const useFeeds = ({ config }: useFeedsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['feeds'],
		queryFn: () => fetchFeeds(),
	});
};

// export const creatFeed = () => {
//   return useMutation((data) => request.post('/api/v1/feeds', { body: JSON.stringify(data) }))
// }

// export const updateFeed = () => {
//   return useMutation((data) => request.post(`/api/v1/feeds/${data.id}`, { body: JSON.stringify(data)}))
// }

export const mutateFeed = () => {
  return useMutation((data) => {
    const url = data.id ? `/api/v1/feeds/${data.id}` : `/api/v1/feeds/`
    console.log(url)
    return request.post(url, { body: JSON.stringify(data) })
  })
}
