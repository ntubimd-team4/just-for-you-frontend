import API from './API';

const BASE_URL = '/topic';

const topicAPI = {
  'patchTopic': (data: any): Promise<Response> =>
    API.patch(BASE_URL, data),

  'deleteTopic': (tid: string): Promise<Response> =>
    API.delete(`${BASE_URL}/${tid}`),
};

export default topicAPI;