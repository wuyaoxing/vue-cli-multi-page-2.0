// import Vue from 'vue'
import pathToRegexp from 'path-to-regexp'
import { errCodes, errWhiteList } from './config'

import bus from 'utils/bus'

const matchWhiteList = ({ method, baseURL, url }) => {
    if (method !== 'get') return false
    return errWhiteList.some(item => !!pathToRegexp(baseURL + item, []).exec(url.replace(/(\?.+)?$/, '')))
}

export default request => new Promise((resolve, reject) => {
    request.then(data => resolve(data)).catch(err => {
        const code = Number(err.code)
        if (code === 302) {
            location.href = err.location
            return
        }

        if (errCodes.includes(code)) {
            matchWhiteList(err.config)
                ? reject(err)
                : location.replace(`${location.pathname}#/404`)
            return
        }
        reject(err)
        bus.$emit('message-error', err)
    })
})
