import { BaseHttpService } from './base.http.service.ts';
import { Observable } from 'rxjs';
import { RoleData } from '../models/RoleData.ts';

export interface GetAllRoleResponse {
  roleList: RoleData[];
  nextRefKey?: string;
}

export interface GetAllModuleResponse {
  moduleKey: string[];
}
export class UserService extends BaseHttpService {
  private static getEndpoint(): string {
    const apiEndpoint = BaseHttpService.getApiEndpoint();
    return `${apiEndpoint}user/`;
  }

  static async getAllRole(refKey: string | undefined): Promise<Observable<GetAllRoleResponse>> {
    const endpoint = this.getEndpoint();
    const url = `${endpoint}getAllRole`;
    const body = { refKey };
    return this.post<GetAllRoleResponse>(url, body);
  }
}
