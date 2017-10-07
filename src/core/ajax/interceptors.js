import axios from 'axios'
import { updateHeader } from './config'
import timeout from 'core/timeout'

export const REQ_INTERCEPTOR = conf => {
    timeout()
    if(conf.method === 'get') conf.url += `?t=${Date.now()}`
    return conf
}

export const RES_INTERCEPTOR = ({ status, headers, data: resData, config }) => {
    // 更新 token
    if('X-SID' in headers) {
        const SID = headers['X-SID']
        const PHPSESSID = headers['X-PHPSESSID']
        axios.defaults.headers['X-SID'] = SID
        axios.defaults.headers['X-PHPSESSID'] = PHPSESSID
        updateHeader({ SID, PHPSESSID })
    }

    // 302 跳转
    if(status === 302 && headers.location) {
        const redirect = {
            code: 302,
            location: headers.location
        }
        return Promise.reject(redirect)
    }

    // 空数据
    const resLen = Object.keys(resData).length
    if(typeof resData !== 'object' || !resLen) return null

    const {
        data,
        error
    } = resData

    // error
    if(error) {
        error.config = config
        return Promise.reject(error)
    }
    // success
    return resLen > 1 ? resData : (data || resData)
}
