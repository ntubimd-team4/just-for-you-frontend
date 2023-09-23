import API from './API';

const PATCH_COLLECTION = '/music-recommend/collection';
const GET_ALL_RECORD = '/recommend-record/data';
const GET_TAG_RECORD = '/recommend-record/tag';

const recommendAPI = {
  'getAllRecord': (): Promise<Response> =>
    API.get(GET_ALL_RECORD),

  'getRecordByTag': (tag: any): Promise<Response> =>
    API.get(GET_TAG_RECORD, tag),

  'patchCollention': (rid: any): Promise<Response> =>
    API.patch(PATCH_COLLECTION, rid),
};

export default recommendAPI;