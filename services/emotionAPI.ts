import API from './API';

const BASE_URL = '/emotion';

const emotionAPI = {
  'patchEmotionTag': (eid: any): Promise<Response> =>
    API.patch(BASE_URL, eid),

  'deleteEmotionTag': (eid?: string): Promise<Response> =>
    API.delete(`${BASE_URL}/${eid}`),
};

export default emotionAPI;