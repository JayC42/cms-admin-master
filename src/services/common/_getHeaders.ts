import getApiEndpoint from './getApiEndpoint';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/LocalStorage.helper.ts';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

function getValidJwtToken(): Observable<string | null> {
  const jwtToken = localStorage.getItem(ACCESS_TOKEN);
  return from(isTokenValid(jwtToken)).pipe(
    switchMap((isTokenValid) => {
      if (isTokenValid) return of(jwtToken);
      else return refreshToken().pipe(map((token) => token));
    }),
  );
}

function refreshToken(): Observable<string | null> {
  const endpoint = getApiEndpoint();
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  return from(
    fetch(`${endpoint}user/generateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    }),
  ).pipe(
    switchMap((response) => {
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return from(response.json());
    }),
    map((data) => {
      localStorage.setItem(ACCESS_TOKEN, data.accessToken);
      return data.accessToken;
    }),
    catchError((error) => {
      console.error(error);
      return of(null);
    }),
  );
}

async function isTokenValid(token: string | null) {
  if (!token) return false;

  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const now = Math.floor(Date.now() / 1000);
    return now < decoded.exp;
  } catch (e) {
    console.error('Invalid JWT: ', e);
    return false;
  }
}

function _getHeaders(
  contentType: 'application/json' | 'multipart/form-data' | null = null,
  requireToken: boolean = true,
): Observable<Record<string, string>> {
  const headers: Record<string, string> = {};

  if (!requireToken) {
    if (contentType) {
      headers['Content-Type'] = contentType;
    }
    return of(headers);
  }

  return getValidJwtToken().pipe(
    switchMap((jwtToken) => {
      if (!jwtToken) {
        window.dispatchEvent(new CustomEvent('sessionTimeout'));
        return of({});
      }

      if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
      }
      if (contentType) {
        headers['Content-Type'] = contentType;
      }

      return of(headers);
    }),
  );
}

export default _getHeaders;
