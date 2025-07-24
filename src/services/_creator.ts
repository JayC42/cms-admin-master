import {
  useQuery,
  useQueryClient,
  useMutation as useReactQueryMutation,
} from '@tanstack/react-query';
import getApiEndpoint from './common/getApiEndpoint.ts';
import getHeaders from './common/getHeaders.ts';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

type _BaseResponse = { success: boolean };

interface _QueryConstraint {
  res: unknown;
  pathParams?: unknown;
  queryParams?: Record<string, unknown>;
}

type _QueryOptions<T> = {
  onFreshFetched?: (data: T) => Promise<void> | void;
  enabled?: boolean;
  [key: string]: unknown;
};

type _QueryProps<T extends _QueryConstraint> = {
  pathParams?: T['pathParams'];
  queryParams?: T['queryParams'];
  options?: _QueryOptions<T['res']>;
};

export const _queryCreator =
  <T extends _QueryConstraint>() =>
  (endpoint: string, requireToken = true) =>
  (props?: _QueryProps<T>, secondOptions?: _QueryOptions<T['res'] & _BaseResponse>) => {
    //const queryClient = useQueryClient();
    const { pathParams, queryParams = {}, options } = props || {};

    const path = typeof pathParams === 'string' ? `${endpoint}/${pathParams}` : endpoint;

    const query = new URLSearchParams(
      Object.entries(queryParams)
        .filter(([, value]) => value != null)
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: String(value),
          }),
          {},
        ),
    ).toString();

    const defaultOptions = {
      queryKey: [path, queryParams],
      queryFn: async () => {
        const response = await fetch(`${getApiEndpoint()}${path}${query ? `?${query}` : ''}`, {
          method: 'GET',
          headers: await getHeaders('application/json', requireToken),
        });
        const data = await response.json();
        if (!response.ok) {
          return { success: false, error: data.error || 'Unknown error' } as T['res'];
        }
        const result = { ...data, success: true } as T['res'] & _BaseResponse;
        await secondOptions?.onFreshFetched?.(result);
        return result;
      },
      enabled: true,
    };

    return useQuery<T['res']>({
      ...defaultOptions,
      ...options,
      ...secondOptions,
    });
  };

/**
 * Creates a mutation hook for API operations
 * @template TData The type of data sent to the server
 * @template TResponse The type of response from the server
 * @template TPathParams The type of path parameters
 * @returns A custom hook for performing mutations
 */
export const _mutateCreator = <
  TData extends Record<string, unknown> | FormData = Record<string, unknown>,
  TResponse extends Record<string, unknown> = Record<string, unknown>,
  TPathParams = string,
>() => {
  /**
   * Creates a mutation hook for a specific endpoint
   * @param endpoint The API endpoint path
   * @param method The HTTP method to use
   * @param requireToken Whether authentication is required
   * @param defaultOptions Default mutation options
   * @returns A custom React hook for the mutation
   */
  return function createMutationHook(
    endpoint: string,
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    requireToken = true,
    defaultOptions?: Omit<
      UseMutationOptions<TResponse, Error, { req: TData; pathParams?: TPathParams }>,
      'mutationFn'
    >,
  ) {
    /**
     * Custom hook for performing mutations
     * @param options Additional mutation options
     * @returns Mutation result and functions
     */
    return function useCustomMutation(
      options?: Omit<
        UseMutationOptions<TResponse, Error, { req: TData; pathParams?: TPathParams }>,
        'mutationFn'
      >,
    ): UseMutationResult<TResponse, Error, { req: TData; pathParams?: TPathParams }> {
      const queryClient = useQueryClient();

      return useReactQueryMutation({
        mutationFn: async (params?: {
          req: TData;
          pathParams?: TPathParams;
        }): Promise<TResponse> => {
          const { req = {} as TData, pathParams } = params || {};

          // Construct the URL with path parameters if provided
          let url = `${getApiEndpoint()}${endpoint}`;

          // Handle path parameters based on their type
          if (pathParams !== undefined) {
            if (typeof pathParams === 'string' || typeof pathParams === 'number') {
              // Simple path parameter (e.g., "select-winner/123")
              url = `${url}/${pathParams}`;
            } else if (typeof pathParams === 'object' && pathParams !== null) {
              // Object with named path parameters
              // Replace placeholders like {id} with actual values
              url = url.replace(/{([^}]+)}/g, (_, key) => {
                const paramValue = (pathParams as Record<string, string | number>)[key];
                if (paramValue === undefined) {
                  throw new Error(`Missing path parameter: ${key}`);
                }
                return String(paramValue);
              });
            }
          }

          // Prepare the request body based on data type
          const body = req instanceof FormData ? req : JSON.stringify(req);

          // Set appropriate content type header
          const contentType = req instanceof FormData ? null : 'application/json';

          const response = await fetch(url, {
            method,
            body,
            headers: await getHeaders(contentType, requireToken),
          });

          // Parse the response
          const responseData = await response.json();

          // Handle error responses
          if (!response.ok) {
            throw new Error(responseData.message || `HTTP error ${response.status}`);
          }

          // Return the response with success flag
          return { ...responseData, success: true } as TResponse;
        },
        ...defaultOptions,
        ...options,
      });
    };
  };
};
