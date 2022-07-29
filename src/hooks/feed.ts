import { useMutation, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import { ExtractFnReturnType, FeedProps, useFeedsOptions } from '@/types';

export const fetchFeeds = (): Promise<Array<FeedProps>> => {
	return ky.get('/api/v1/feeds').json();
};

type QueryFnType = typeof fetchFeeds;

export const useFeeds = ({ config }: useFeedsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		...config,
		queryKey: ['feeds'],
		queryFn: () => fetchFeeds(),
	});
};
