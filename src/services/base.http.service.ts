import { isNull, omitBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { backendUrl } from '../configs/config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/LocalStorage.helper.ts';

export class BaseHttpService {
  static API_ENDPOINT: string;

  static SESSION_TIMEOUT = new Observable<any>((observer) => {
    observer.error(new Error('Session timed out'));
  });

  static getApiEndpoint(): string {
    if (!this.API_ENDPOINT) {
      this.API_ENDPOINT = `${backendUrl}/api/admin/`;
    }
    return this.API_ENDPOINT;
  }

  private static async getHeaders(
    contentType: 'application/json' | 'multipart/form-data' | null = null,
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};

    const jwtToken = await this.getValidJwtToken();
    console.log('jwtToken', jwtToken);
    if (!jwtToken) {
      console.log('ready to dispatch');
      window.dispatchEvent(new CustomEvent('sessionTimeout'));
      return {};
    }

    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    return headers;
  }

  private static async getValidJwtToken(): Promise<string | null> {
    let jwtToken = localStorage.getItem(ACCESS_TOKEN);
    console.log('getValidJwtToken', jwtToken);
    if (!jwtToken || this.isTokenValid(jwtToken)) {
      try {
        jwtToken = await this.refreshToken();
        if (jwtToken) {
          localStorage.setItem(ACCESS_TOKEN, jwtToken);
        }
      } catch {
        return null;
      }
    }
    return jwtToken;
  }

  private static async refreshToken(): Promise<string | null> {
    try {
      const endpoint = this.getApiEndpoint();
      const response = await fetch(`${endpoint}user/generateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem(REFRESH_TOKEN),
        }),
      });
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private static isTokenValid(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(window.atob(payload));
      const exp = decodedPayload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now >= exp;
    } catch (e) {
      console.error('Invalid JWT: ', e);
      return false;
    }
  }

  protected static async post<T>(url: string, data: any): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders('application/json'); // Attempt to get headers
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }

    return new Observable<T>((observer) => {
      const body = JSON.stringify(omitBy(data, isNull));
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((responseData) => {
          observer.next(responseData);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  protected static async put<T>(url: string, data: any): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders('application/json'); // Attempt to get headers
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }

    return new Observable<T>((observer) => {
      const body = JSON.stringify(omitBy(data, isNull));
      fetch(url, {
        method: 'PUT',
        headers: headers,
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((responseData) => {
          observer.next(responseData);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  protected static async upload<T>(url: string, data: any): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders();
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }
    return new Observable<T>((observer) => {
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((responseData: T) => {
          observer.next(responseData);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  protected static async patch<T>(url: string, data: any): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders('application/json');
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }
    return new Observable((observer) => {
      const filteredData = omitBy(data, isNull);
      const body = JSON.stringify(filteredData);
      fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: body,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  protected static async get<T>(url: string): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders('application/json');
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }
    return new Observable((observer) => {
      fetch(url, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
  protected static async delete<T>(url: string): Promise<Observable<T>> {
    let headers: Record<string, string> | null;
    try {
      headers = await this.getHeaders('application/json');
    } catch (error) {
      console.error('Failed to get headers:', error);
      return BaseHttpService.SESSION_TIMEOUT;
    }

    if (!headers) {
      return BaseHttpService.SESSION_TIMEOUT;
    }
    return new Observable((observer) => {
      fetch(url, {
        method: 'DELETE',
        headers: headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
