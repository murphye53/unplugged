import axios from 'axios';

export function saveComment(comment: { postId: number; comment: string; commenter: string }){
    const url = 'https://prod-175.westus.logic.azure.com/workflows/9b67d8732da84dac83dab9d2c75da3b6/triggers/manual/paths/invoke/comments';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oVwEzkAw_ikh-aXQVehH64t7NQE5PN549B_dBWMbfUk';

    return axios.post(url + pathParams, comment)
}

export function deleteComment(id: number){
    const url = 'https://prod-122.westus.logic.azure.com/workflows/a0d355376b6a44b08b1b5200bbdfd2ad/triggers/manual/paths/invoke/comments/';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JGnabTyIFJVlCt7SgdIkKk6OEhX4t9_dDxmIKJFqOF4';

    return axios.delete(url + id + pathParams)
}

export function getCommentsForPost(id: number){
    const url = 'https://prod-98.westus.logic.azure.com/workflows/a9b8dac4013243af8bd44643390bfef5/triggers/manual/paths/invoke/comments/post/';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=efXX-49IzJUdztAOVdZCLrHU6i3RQy7RuCgBdXjDc7s';

    return axios.get(url + id + pathParams)
}