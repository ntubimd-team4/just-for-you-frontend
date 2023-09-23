import API from './API';

const BASE_URL = '/consultation-record';

const consultationAPI = {
  'patchConsultation': (data: any): Promise<Response> =>
    API.patch(BASE_URL, data),

  'postConsultation': (data: any): Promise<Response> =>
    API.post(BASE_URL, data),
};

export default consultationAPI;