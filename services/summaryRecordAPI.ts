import API from './API';

const BASE_URL = '/summary-record';
const DETAIL_URL = '/summary-record';

const summaryAPI = {
  'getSummary': (userId: any): Promise<Response> =>
    API.get(`${BASE_URL}?userId=${userId}`),

  'getSummaryDetail': (sid : any): Promise<Response> =>
    API.get(`${DETAIL_URL}/${sid}`),

  'postSummary': (data: any): Promise<Response> =>
    API.post(BASE_URL, data),
};

export default summaryAPI;