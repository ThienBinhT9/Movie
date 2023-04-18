import axios from "axios";
import queryString from "query-string";

import configApi from '../utils/configTmdbApi'

const axiosClient = axios.create({
    baseURL:configApi.baseUrl,
    headers:{
        'Content-Type': 'application/json'
    },
    paramsSerializer:{
        serialize: params => queryString.stringify({...params, api_key: configApi.apiKey},{arrayFormat:'bracket'})
    }
})

axiosClient.interceptors.request.use(async config => config)

axiosClient.interceptors.response.use(res => {
    if(res && res.data){
        return res.data
    }

    return res
}, (error) => { throw error })

export default axiosClient