import axios from 'axios'
import HTTP_HANDLE from './handler'
import { CONTENT_TYPE, ROOT_PATH, XHR_HEADER } from './config'
import { REQ_INTERCEPTOR, RES_INTERCEPTOR } from './interceptors'

axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = CONTENT_TYPE
axios.defaults.baseURL = ROOT_PATH
axios.defaults.headers.Accept = CONTENT_TYPE
axios.defaults.responseType = 'json'
Object.assign(axios.defaults.headers, XHR_HEADER)

axios.interceptors.request.use(REQ_INTERCEPTOR)
axios.interceptors.response.use(RES_INTERCEPTOR, error => Promise.reject(error))

/**
 * 格式化参数
 * @param {*} params Object
 */
// const QS = (params = {}) => {
//     // const urlParams = new URLSearchParams()
//     let url = ''
//     Object.keys(params).forEach((k, i) => {
//         url += `${i === 0 ? '' : '&'}${k}=${params[k]}`
//         // urlParams.append(k, params[k])
//     })
//     return url
//     // return urlParams
// }

const fixUrl = url => url.replace(/(.+)\/$/, '$1')
const urlPattern = (url, arg) => ({
    url: url.replace(/:[a-zA-Z]+/g, () => arg.shift()),
    params: arg.length ? arg[0] : null
})
/**
 * http GET
 * @param {*} url String
 * @param {*} params Object
 */
export const GET = (url, params) => HTTP_HANDLE(axios.get(url, params ? {
    params
} : params))

/**
 * http POST
 * @param {*} url String
 * @param {*} body Object
 */
export const POST = (url, body) => HTTP_HANDLE(axios.post(url, body))

/**
 * http PUT
 * @param {*} url String
 * @param {*} body Object
 */
export const PUT = (url, body) => HTTP_HANDLE(axios.put(url, body))

/**
 * http DELETE
 * @param {*} url String
 * @param {*} params Object
 */
export const DELETE = (url, params) => HTTP_HANDLE(axios.delete(url, params ? {
    params
} : params))

/**
 * REQUEST
 * @param {*} path
 * @param {*} args
 */
export const REQUEST = (path, ...args) => {
    const {
        url,
        params
    } = urlPattern(path, args)
    return HTTP_HANDLE(axios(url, params))
}

/**
 * 对常用 RESTful 请求格式的封装，支持多级资源请求
 * 以一个实体 User 为例，基础 URL 为 `/api/user`，则：
 * 查询 GET /api/user/:id
 * 添加 POST /api/user
 * 修改 PUT /api/user/:id
 * 删除 DELETE /api/user/:id
 *
 * @export
 * @class Api
 */
export default class Api {
    constructor(url) {
        this.url = fixUrl(url)
    }

    add(...m) {
        const {
            url,
            params
        } = urlPattern(this.url, m)
        return POST(url, params)
    }

    update(...args) {
        const {
            url,
            params
        } = urlPattern(`${this.url}/:id`, args)
        return PUT(url, params)
    }

    delete(...args) {
        const {
            url,
            params
        } = urlPattern(`${this.url}/:id`, args)
        return DELETE(url, params)
    }

    one(...args) {
        const {
            url,
            params
        } = urlPattern(`${this.url}/:id`, args)
        return GET(url, params)
    }

    all(...args) {
        const {
            url,
            params
        } = urlPattern(this.url, args)
        return GET(url, params)
    }

    request(client, path, ...args) {
        const {
            url,
            params
        } = urlPattern(`${this.url}/:id${path}`, args)
        return client(url, params)
    }
}
