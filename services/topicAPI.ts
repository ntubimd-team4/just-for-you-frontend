import API from './API';

const topicAPI = {
    'patchTopic': ((data: any): Promise<Response> =>
        API.patch('/topic', data)),

    'deleteTopic': ((tid: string): Promise<Response> =>
        API.delete(`/topic/${tid}`)),
};

export default topicAPI;