import API from './API';

const userAPI = {
  'login': (token?: string): Promise<Response> =>
    API.post('/login', undefined, { 'headers': { 'X-Client-Token': token } }),

  'postSummary': (data: any): Promise<Response> =>
    API.post('/summary_record', data),

  'getSingleUser': (id?: string): Promise<Response> =>
    API.get(`/user-account/${id}`),

  'getAuth': (): Promise<Response> =>
    API.get('/user-account/role'),

  'getProfile': (): Promise<Response> =>
    API.get('/user-account/profile'),

  'getList': (data: any): Promise<Response> =>
    API.get('/user-account/list', { 'params': { ...data } }),

  'patchStatus': (id: string): Promise<Response> =>
    API.patch(`/user-account/status?id=${id}`),

  'patchAccount': (data: any): Promise<Response> =>
    API.patch('/user-account', data),

  'patchProfile': ((data: any): Promise<Response> =>
    API.patch('/user-account/profile', data)),
};

export default userAPI;