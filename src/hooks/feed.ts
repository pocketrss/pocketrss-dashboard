import { useMutation, useQuery } from '@tanstack/react-query';
import { createStandaloneToast } from '@chakra-ui/toast'

import { Dict, ExtractFnReturnType, QueryResponseProps, useQueryOptions } from '@/types';
import request from '@/utils/ky';

const { toast } = createStandaloneToast()

export const fetchFeeds = async ({ pagination, token }: useQueryOptions): Promise<QueryResponseProps> => {
  const pageIndex = pagination?.pageIndex ?? 1
  const pageSize = pagination?.pageSize ?? 10
  let opts = { searchParams: { offset: pageIndex * pageSize, limit: pageSize }}
  if (token && token.length > 0) {
    opts = Object.assign(opts, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  let result = { code: 419 }
  try {
    const resp = await request.get('/api/v1/feeds', opts)
    result = await resp.json()
  } catch (error) {
    toast({ title: 'Error', status: 'error' })
  }
	return result;
};

type QueryFnType = typeof fetchFeeds;

export const useFeeds = ({ pagination, token, config }: useQueryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['feeds', pagination?.pageIndex ?? 0, pagination?.pageSize ?? 10],
		queryFn: () => fetchFeeds({ pagination, token }),
	});
};

// export const creatFeed = () => {
//   return useMutation((data) => request.post('/api/v1/feeds', { body: JSON.stringify(data) }))
// }

// export const updateFeed = () => {
//   return useMutation((data) => request.post(`/api/v1/feeds/${data.id}`, { body: JSON.stringify(data)}))
// }

export const mutateFeed = () => {
  return useMutation((data: Dict) => {
    const url = data?.id ? `/api/v1/feeds/${data?.id}` : `/api/v1/feeds/`
    console.log(url)
    return request.post(url, { body: JSON.stringify(data) })
  })
}
