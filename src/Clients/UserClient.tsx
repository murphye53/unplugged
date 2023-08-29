import axios from 'axios';
import UserI from "../Models/UserI";

export function getAllUsers(){
    const url = 'https://prod-136.westus.logic.azure.com/workflows/e1d8ea299c894d868e503d1f9e83ac42/triggers/manual/paths/invoke/users';
    const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1kX7r_NTPCOQTIIr_pWAWGlpTpels2pDnfFs0CWGC-E';
     //may need to remove users from the end of url if this doesn't work

    return axios.get<UserI[]>(url + queryParams);
}

export function getUserByID(id: string | undefined) {
        const url = 'https://prod-17.westus.logic.azure.com/workflows/513e0579aa4b47bfab9eb6506b983f33/triggers/manual/paths/invoke/users/';
        const queryParams = '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=euY23soqm1AQFv3uEUjIbJHfP38azqu2R8RFt5uVELU';

        return axios.get<UserI>(url + id + queryParams)
}