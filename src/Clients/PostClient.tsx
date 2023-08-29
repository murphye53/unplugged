import PostI from "../Models/PostI";
import axios from "axios";

export function saveNewPost(post: PostI) {
    const url = 'https://prod-142.westus.logic.azure.com/workflows/844fbe7ee5e54f1f9150e885c821833e/triggers/manual/paths/invoke/posts?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GItXVxYrKinx6P21DfdRh8rvrhVBhAVYxPHAvOsdV4M';

    return axios.post(url, post)
}

export function getPostsByPoster(id:string ) {
    const url = 'https://prod-172.westus.logic.azure.com/workflows/df7da138479d48619da443bae445192e/triggers/manual/paths/invoke/posts/by/';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kadNq2b_q-OrGb20IVaySCSO05Tunht_Ny_-ELFcAjg';

    return axios.get(url + id + pathParams)
}

export function getPostsForFeed(id:string ) {
    const url = 'https://prod-138.westus.logic.azure.com/workflows/191736b7dd8f4aa4acb264c005665e4b/triggers/manual/paths/invoke/feed/';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ENd3c5p4D1WaNJKC9Qqx0VbP3Xbc-CHgYFRU_K8CwO0';

    return axios.get(url + id + pathParams)
}

export function getPostsForExplore(id:string ) {
    const url = 'https://prod-143.westus.logic.azure.com/workflows/1200c45007d64e1fa6e9d335fc65d032/triggers/manual/paths/invoke/explore/';
    const pathParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4HSndNorDfEd-NQmW9w3-QKn7Sr1B2OgPdiSzCE_Czs';

    return axios.get(url + id + pathParams)
}