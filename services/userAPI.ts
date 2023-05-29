import API from './API';

const userAPI = {
  'login': (token?: string): Promise<Response> =>
    API.post('/login', undefined, { 'headers': { 'X-Client-Token': token } }),
};

export default userAPI;