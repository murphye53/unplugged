import axios from 'axios';

export function follow(follower: string, follows: string){
    const url = 'https://prod-110.westus.logic.azure.com/workflows/17e3bf4ae9d84716964c5be63a96993d/triggers/manual/paths/invoke/follow';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yFPa6jnrNTgEAsn-n0VZaI2zdwrhpb85TBs8KWVbmHA';

    return axios.post(url + pathParams, {
        follower: follower,
        follows: follows
    })
}

export function unfollow(follower: string, follows: string){
    const url = 'https://prod-125.westus.logic.azure.com/workflows/50da25fd85e64dd988262704558845b4/triggers/manual/paths/invoke/follows/';
    const pathParams = follower + "/" + follows;
    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Th0uqu_HVLkwO9TgZEoNuJhBer0WZU-4JNqK2RPapto';

    return axios.delete(url + pathParams + queryParams)
}

export function getFollowers(follows: string){
    const url = 'https://prod-72.westus.logic.azure.com/workflows/4d0f371dc0c54e6dbd87512d9d5c903f/triggers/manual/paths/invoke/follows/following/';
    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oJYRXUinoY3dwZvWGV5SIpe2KiXX454W09r9T4UgiBQ';

    return axios.get(url + follows + queryParams)
}
