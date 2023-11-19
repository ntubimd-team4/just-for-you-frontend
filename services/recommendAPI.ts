import API from './API';

const PATCH_COLLECTION = '/collection';
const GET_ALL_RECORD = '/recommend-record';
const GET_RE_RECOMMEND = '/music-recommend';
const GET_TAG_RECORD = '/recommend-record/tag';
const GET_QUERY_RECORD = '/recommend-record/query';
const GET_USER_TAG = '/recommend-record/emotion-tag';

const recommendAPI = {
  'getAllRecord': (): Promise<Response> =>
    API.get(GET_ALL_RECORD),

  'getUserTag': (): Promise<Response> =>
    API.get(GET_USER_TAG),

  'getRecordByTag': (tag: any): Promise<Response> =>
    API.get(`${GET_TAG_RECORD}?tag=${tag}`),

  'getRecordByQuery': (song: any): Promise<Response> =>
    API.get(`${GET_QUERY_RECORD}?song=${song}`),

  'getReRecommend': (sid: any): Promise<Response> =>
    API.get(`${GET_RE_RECOMMEND}?sid=${sid}`),

  'patchCollention': (rid: any): Promise<Response> =>
    API.patch(PATCH_COLLECTION, rid),
};

export default recommendAPI;