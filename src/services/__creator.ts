import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type DefaultError,
} from '@tanstack/react-query';
import getHeaders from './common/getHeaders';
import getApiEndpoint from './common/getApiEndpoint.ts';

type PathParam = string | Record<string, string | number | undefined> | undefined;

type QueryConstraint = {
  res: Record<string, unknown>;
  pathParams?: PathParam;
  queryParams?: Record<string, string | null | number | undefined>;
};

type UnionNull<T> = {
  [K in keyof T]: T[K] | null;
};

type QueryProps<T extends QueryConstraint> = (unknown extends T['pathParams']
  ? { pathParams?: never }
  : {
      pathParams: (T['pathParams'] extends string ? string : UnionNull<T['pathParams']>) | null;
    }) &
  (unknown extends T['queryParams']
    ? { queryParams?: never }
    : { queryParams: UnionNull<T['queryParams']> });

type GetAllPathParams<
  T extends string,
  U extends string = never,
> = T extends `${string}{${infer P}}${infer H}` ? GetAllPathParams<H, P | U> : U;

type ValidateURL<U extends string, T extends PathParam> = unknown extends T
  ? string
  : T extends undefined
    ? string
    : T extends string
      ? U
      : keyof T extends GetAllPathParams<U>
        ? GetAllPathParams<U> extends keyof T
          ? U
          : 'remove extra params'
        : 'missing params';

export type QueryOptions<T extends QueryConstraint['res']> = UseQueryOptions<T> & {
  onFreshFetched?: (data: T) => void;
};

export const queryCreator =
  <T extends QueryConstraint = { res: Record<string, never> }>() =>
  <U extends string>(
    urlWithoutParamsAndBase: U extends U ? ValidateURL<U, T['pathParams']> : U,
    requireToken = true,
    options?: Partial<QueryOptions<T['res']>>,
  ) =>
  (
    ...args: unknown extends T['pathParams']
      ? unknown extends T['queryParams']
        ? [props?: null, options_?: Partial<QueryOptions<T['res']>>]
        : [props: QueryProps<T>, options_?: Partial<QueryOptions<T['res']>>]
      : [props: QueryProps<T>, options_?: Partial<QueryOptions<T['res']>>]
  ) => {
    const queryClient = useQueryClient();
    const options_ = args[1];
    const { pathParams = '', queryParams = {} } = args[0] || {};
    const queryParamsHasNull = Object.values(queryParams).some((v) => v === null);
    const query = new URLSearchParams(queryParams).toString();
    const path =
      (typeof pathParams === 'string'
        ? urlWithoutParamsAndBase + (pathParams ? '/' : '') + pathParams
        : urlWithoutParamsAndBase
            .toString()
            .replace(
              /\{(\w+)\}/g,
              (_, key) => `${pathParams?.[key as keyof typeof pathParams] || null}`,
            )) + '/';
    const fullPath = getApiEndpoint() + path + (query ? '?' : '') + query;
    return useQuery<T['res']>(
      {
        refetchOnMount:
          !queryParamsHasNull &&
          (typeof pathParams === 'string' ||
            !!(pathParams && !Object.values(pathParams).some((v) => v === null))),
        queryKey: [fullPath],
        queryFn: async () => {
          return await fetch(fullPath, {
            method: 'GET',
            headers: await getHeaders('application/json', requireToken),
          }).then(async (res) => {
            const response = (await res.json()) as T;
            await (options_ || options)?.onFreshFetched?.(response);
            return { ...response, success: res.ok };
          });
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        ...options_,
        ...options,
      },
      queryClient,
    );
  };

type MutationConstraints = {
  req?: Record<string, unknown> | unknown[];
  res?: Record<string, unknown>;
  pathParams?: string;
};

type MutationOptions<T extends MutationConstraints> = UseMutationOptions<
  unknown extends T['res'] ? void : T['res'],
  DefaultError,
  (unknown extends T['pathParams'] ? { pathParams?: never } : { pathParams: T['pathParams'] }) &
    (unknown extends T['req'] ? { data?: never } : { data: T['req'] })
>;

export const mutationCreator =
  <T extends MutationConstraints = { res: Record<string, never> }>(
    urlWithoutParamAndBase: string,
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    requireToken = true,
    options?: MutationOptions<T>,
  ) =>
  (options_?: MutationOptions<T>) => {
    const queryClient = useQueryClient();
    return useMutation<
      T['res'],
      DefaultError,
      (unknown extends T['req'] ? { data?: unknown } : { data: T['req'] }) &
        (unknown extends T['pathParams'] ? { pathParams?: never } : { pathParams: T['pathParams'] })
    >(
      {
        // @ts-expect-error 123
        mutationFn: async ({ pathParams = '', data = {} }) =>
          fetch(getApiEndpoint() + urlWithoutParamAndBase + '/' + pathParams, {
            method,
            body: data instanceof FormData ? data : JSON.stringify(data),
            headers: await getHeaders('application/json', requireToken),
          }).then(async (res) => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            const response = await res.json();
            return { ...response, success: res.ok } as T['res'];
          }),
        ...options,
        ...options_,
      },
      queryClient,
    );
  };

type UploadConstraints = {
  req?: Record<string, string | Blob | undefined> | FormData;
  res?: Record<string, unknown>;
  pathParams?: string;
};

type UploadOptions<T extends UploadConstraints> = UseMutationOptions<
  unknown extends T['res'] ? void : T['res'],
  DefaultError,
  (unknown extends T['pathParams'] ? { pathParams?: never } : { pathParams: string }) &
    (unknown extends T['req'] ? { data?: never } : { data: T['req'] })
>;

export const uploadCreator =
  <T extends UploadConstraints = { res: Record<string, never> }>(
    urlWithoutParamAndBase: string,
    requireToken = true,
    options?: UploadOptions<T>,
  ) =>
  (options_?: UploadOptions<T>) => {
    const queryClient = useQueryClient();
    return useMutation<
      T['res'],
      DefaultError,
      (unknown extends T['req'] ? { data?: unknown } : { data: T['req'] }) &
        (unknown extends T['pathParams'] ? { pathParams?: never } : { pathParams: T['pathParams'] })
    >(
      {
        // @ts-expect-error 123
        mutationFn: async ({ pathParams = '', data = {} }) => {
          let body = new FormData();
          if (data instanceof FormData) {
            body = data;
          } else {
            Object.entries(data).forEach(([key, value]) => {
              if (value) body.append(key, value);
            });
          }
          return fetch(getApiEndpoint() + urlWithoutParamAndBase + '/' + pathParams, {
            method: 'POST',
            body,
            headers: await getHeaders(null, requireToken),
          }).then(async (res) => {
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.json();
          });
        },
        ...options,
        ...options_,
      },
      queryClient,
    );
  };
