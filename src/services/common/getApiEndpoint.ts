import { backendUrl } from '../../configs/config';

function getApiEndpoint(): string {
  return `${backendUrl}/api/admin/`;
}

export default getApiEndpoint;
