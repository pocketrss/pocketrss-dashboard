import { IconType } from 'react-icons';
import { BoxProps, FlexProps } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { PaginationState } from '@tanstack/react-table'
import { QueryConfig } from '@/utils/react-query';
import { ReactNode } from 'react';
// declare module '@my-app' {
//   export type Theme = 'light' | 'dark'
// }

export interface CodeResponseProps {
  code?: number;
  message?: string;
  access_token?: string
  created_at?: number;
  scope?: string;
  token_type?: string;
}

export interface VerifyProps {
  acct: string;
  avatar?: string;
  avatar_static?: string;
  dislay_name: string;
  header?: string;
  id: number;
  username: string;
}

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>

export interface MastodonBaseRequestProps {
  limit?: number;
  max_id?: number;
  token?: string;
  config?: unkown;
}

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
  token?: string;
	config?: QueryConfig;
}

export interface useVerifyOptions {
  token: string
  config?: QueryConfig;
}

export interface FeedProps {
  id: number;
  title: string;
  subscription: string;
  description?: string;
  sensitive?: boolean
  disabled?: boolean
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

export interface QueryResponseProps {
  code: number;
  data?: Record<string, Array<EntryProps | FeedProps>>;
  page?: { total: number };
}

export interface useSigninOptions {
  username: string;
  password: string;
  code?: string;
}

export interface DrawerFormProps extends Record<string, unknown> {
  title: string;
  children: ReactNode;
}

declare type Dict<T = any> = Record<string, T>

export { Dict }

export interface DrawerPayloadProps extends Dict {
  id: number;
}
