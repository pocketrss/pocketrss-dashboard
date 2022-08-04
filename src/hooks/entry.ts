import { useMutation, useQuery } from '@tanstack/react-query';

import { ExtractFnReturnType, EntryProps, useEntriesOptions } from '@/types';
import request from '@/utils/ky';

export const fetchEntries = (): Promise<Array<EntryProps>> => {
	return request.get('/api/v1/statuses').json();
};

type QueryFnType = typeof fetchEntries;

export const useEntries = ({ config }: useEntriesOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['entries'],
		queryFn: () => fetchEntries(),
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
