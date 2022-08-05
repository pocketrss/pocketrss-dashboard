import { useMutation, useQuery } from '@tanstack/react-query';

import { ExtractFnReturnType, FeedProps, useQueryOptions } from '@/types';
import request from '@/utils/ky';

export const fetchFeeds = ({ pagination }): Promise<Array<FeedProps>> => {
	return request.get('/api/v1/feeds', { searchParams: { offset: pagination.pageIndex * pagination.pageSize, limit: pagination.pageSize }}).json();
};

type QueryFnType = typeof fetchFeeds;

export const useFeeds = ({ pagination, config }: useQueryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['feeds', pagination?.pageIndex ?? 0, pagination?.pageSize ?? 10],
		queryFn: () => fetchFeeds({ pagination }),
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
