import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { createStandaloneToast } from '@chakra-ui/toast'
import { SearchParamsOption } from 'ky';

import { ExtractFnReturnType, EntryProps, useQueryOptions, QueryResponseProps, Dict, MastodonBaseRequestProps } from '@/types';
import request from '@/utils/ky';

const { toast } = createStandaloneToast()

export const fetchEntries = async ({ pagination, isFavor, token }: useQueryOptions): Promise<QueryResponseProps> => {
  const pageIndex = pagination?.pageIndex ?? 1
  const pageSize = pagination?.pageSize ?? 10
  const searchParams: SearchParamsOption = { offset: pageIndex * pageSize, limit: pageSize }
  if (typeof isFavor !== 'undefined') {
    searchParams.is_favor = isFavor
  }
  let opts = { searchParams }
  if (token && token.length > 0) {
    opts = Object.assign(opts, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  let result = { code: 419 }
  try {
    const resp = await request.get('/api/v1/statuses', opts)
    result = await resp.json()
  } catch (err) {
    toast({ title: 'Error', status: 'error' })
  }
	return result;
};

type QueryFnType = typeof fetchEntries;

export const useEntries = ({ pagination, isFavor, token, config }: useQueryOptions = { pagination: { pageIndex: 0, pageSize: 10}, isFavor: false }): UseQueryResult<QueryResponseProps> => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['entries', pagination?.pageIndex ?? 0, pagination?.pageSize ?? 10],
		queryFn: () => fetchEntries({ pagination, isFavor, token }),
	});
};

export const fetchHomeTimeline = ({ limit, max_id, token }: MastodonBaseRequestProps): Promise<Array<Dict>> => {
  const searchParams: SearchParamsOption = { limit: limit ?? 10, max_id: max_id ?? 0 }
  let opts = { searchParams }
  if (token && token.length > 0) {
    opts = Object.assign(opts, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
	return request.get('/api/v1/timelines/home', opts).json()
}

type HomeTimelineType = typeof fetchHomeTimeline

export const useHomeTimeline = ({ limit, max_id, token, config }: MastodonBaseRequestProps) => {
	return useQuery<ExtractFnReturnType<HomeTimelineType>>({
		...config,
		queryKey: ['timelines', 'home', limit ?? 10, max_id ?? 0],
		queryFn: () => fetchHomeTimeline({ limit, max_id, token })
	})
}

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
