import requests from "./requests";

export interface HttpConfig {
    url: string;
    method: string;
    data?: {[key: string]: any};
    params?: {[key: string]: any}
}

const _http = (config: HttpConfig) => {
    return new Promise((resolve, reject) => {
        return requests({
            url: config.url,
            method: config.method,
            data: config.data,
            params: config.params
        })
        .then(resp => {
            resolve(resp);
        })
        .catch(err => {
            reject(err);
        })
    })
}




export default _http;