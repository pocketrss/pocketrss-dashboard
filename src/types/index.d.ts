import { IconType } from 'react-icons';
import { BoxProps, FlexProps } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { PaginationState } from '@tanstack/react-table'
declare module '@my-app' {
  export type Theme = 'light' | 'dark'
}

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>

export interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

export interface SidebarProps extends BoxProps {
  linkItems: Array<LinkItemProps>;
  onClose: () => void;
}

export interface NavItemProps extends FlexProps {
	icon: IconType;
	url: string;
	children: ReactText;
}

export interface MobileProps extends FlexProps {
	onOpen: () => void;
}

export interface useQueryOptions {
  pagination?: PaginationState;
  isFavor?: boolean;
	config?: QueryConfig;
}
export interface FeedProps {
  id: number;
  title: string;
  subscription: string;
  description: string;
  sensitive: boolean
  disabled: boolean
}

export interface EntryProps {
  id: number;
  title: string;
  content?: string;
  description?: string;
  url?: string;
  author?: string;
  published_at: DateTime;
  favorited_at?: DateTime;
  created_at: DateTime;
}
