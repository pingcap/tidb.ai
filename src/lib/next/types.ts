import type { ReactNode } from 'react';

export type RouteProps<Params> = {
  params: Params
}

export type PageProps<Params, SearchParams = {}> = RouteProps<Params> & {
  searchParams?: SearchParams
}

export type LayoutProps<Params = {}, Slots extends string = 'children'> =
  { params: Params }
  & Record<Slots, ReactNode>
