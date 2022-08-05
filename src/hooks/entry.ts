import { useMutation, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table'

import { ExtractFnReturnType, EntryProps, useQueryOptions } from '@/types';
import request from '@/utils/ky';

export const fetchEntries = ({ pagination, isFavor }): Promise<Array<EntryProps>> => {
  const searchParams = { offset: pagination.pageIndex *pagination.pageSize, limit: pagination.pageSize }
  if (typeof isFavor !== 'undefined') {
    searchParams.is_favor = isFavor
  }
	return request.get('/api/v1/statuses', { searchParams }).json();
};

type QueryFnType = typeof fetchEntries;

export const useEntries = ({ pagination, isFavor, config }: useQueryOptions = { pagination: { pageIndex: 0, pageSize: 10}, isFavor: false }) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['entries', pagination?.pageIndex ?? 0, pagination?.pageSize ?? 10],
		queryFn: () => fetchEntries({ pagination, isFavor }),
	});
};

// export const creatFeed = () => {
//   return useMutation((data) => request.post('/api/v1/feeds', { body: JSON.stringify(data) }))
// }

// export const updateFeed = () => {
//   return useMutation((data) => request.post(`/api/v1/feeds/${data.id}`, { body: JSON.stringify(data)}))
// }

// export const mutateFeed = () => {
//   return useMutation((data) => {
//     const url = data.id ? `/api/v1/feeds/${data.id}` : `/api/v1/feeds/`
//     console.log(url)
//     return request.post(url, { body: JSON.stringify(data) })
//   })
// }
