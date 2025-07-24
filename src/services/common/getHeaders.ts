import getApiEndpoint from './getApiEndpoint';
import { REFRESH_TOKEN } from '../../utils/LocalStorage.helper';

async function getValidJwtToken(): Promise<string | null> {
  let jwtToken = localStorage.getItem('accessToken');
  if (!jwtToken || isTokenValid(jwtToken)) {
    jwtToken = await refreshToken();
  }
  return jwtToken;
}

async function refreshToken(): Promise<string | null> {
  try {
    const endpoint = getApiEndpoint();
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
    localStorage.setItem('jwtToken', data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function isTokenValid(token: string): boolean {
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

async function getHeaders(
  contentType: 'application/json' | 'multipart/form-data' | null = null,
  requireToken: boolean = true,
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};

  // Set Content-Type first
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  // Then handle token if required
  if (requireToken) {
    const jwtToken = await getValidJwtToken();
    if (!jwtToken) {
      window.dispatchEvent(new CustomEvent('sessionTimeout'));
      return headers; // Return headers with Content-Type if set
    }

    headers['Authorization'] = `Bearer ${jwtToken}`;
  }

  return headers;
}

export default getHeaders;
