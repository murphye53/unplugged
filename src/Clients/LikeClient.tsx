import axios from "axios";

export function getPostLikes(postId: number){
    const url = 'https://prod-107.westus.logic.azure.com/workflows/75a8bb5bd80b4c0db2d1453089431b10/triggers/manual/paths/invoke/likes/post/';

    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=d3e6IOl6o-TDPnsplcrS4GtQtBpu_IO7N7LQrffaRbc';

    return axios.get(url + postId + queryParams)
}

export function saveLike(postId: number, userId: string){
    const url = 'https://prod-70.westus.logic.azure.com/workflows/fc6409963cba4669ae48d8b3cd6b7ac5/triggers/manual/paths/invoke/likes';

    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XA6CiT7rAp6gteMinfPALyEYaLnsac1vhX25Iu7p6T4';

    return axios.post(url + queryParams, {
        postId: postId,
        userId: userId
    })
}

export function deleteLike(postId: number, userId: string){
    const url = 'https://prod-36.westus.logic.azure.com/workflows/d95cc6900015412fb411d8b6ea1dd0cb/triggers/manual/paths/invoke/likes/';

    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I2SCfehrEQH6v1_Wl4kPdIiyk9o-WIWkbAACdUkjcX4';

    return axios.delete(url + postId +"/" + userId + queryParams);
}