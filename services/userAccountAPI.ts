import API from './API';

const BASE_URL = '/user-account';
const USER_LIST_URL = '/user-account';
const USER_ROLE_URL = '/user-account/role';
const USER_PROFILE_URL = '/user-account/profile';
const USER_STATUS_URL = '/user-account/status';

const userAPI = {
  'login': (token?: string): Promise<Response> =>
    API.post('/login', undefined, { 'headers': { 'X-Client-Token': token } }),

  'getSingleUser': (id?: string): Promise<Response> =>
    API.get(`${BASE_URL}/${id}`),

  'getList': (data: any): Promise<Response> =>
    API.get(USER_LIST_URL, { 'params': { ...data } }),

  'getAuth': (): Promise<Response> =>
    API.get(USER_ROLE_URL),

  'getProfile': (): Promise<Response> =>
    API.get(USER_PROFILE_URL),

  'patchProfile': (data: any): Promise<Response> =>
    API.patch(USER_PROFILE_URL, data),

  'patchStatus': (data: any): Promise<Response> =>
    API.patch(USER_STATUS_URL, data),

  'patchAccount': (data: any): Promise<Response> =>
    API.patch(BASE_URL, data),
};

export default userAPI;