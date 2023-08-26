import API from './API';

const emotionAPI = {
  'patchEmotionalTag': ((data: any): Promise<Response> =>
    API.patch('/emotion', data)),

  'deleteEmotionalTag': (eid?: string): Promise<Response> =>
    API.delete(`/emotion/${eid}`),
};

export default emotionAPI;