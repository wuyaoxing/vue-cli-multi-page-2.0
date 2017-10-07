import { GET } from 'core/ajax'

const MAX_WAIT_TIME = 5 * 60 * 1000 // 5分钟/ms

const touch = () => GET('/sys/touch').then(() => {
    console.log('Session.touch :', new Date().toLocaleString())
})

let timer = setTimeout(touch, MAX_WAIT_TIME)

export default () => {
    clearTimeout(timer)
    timer = setTimeout(touch, MAX_WAIT_TIME)
}
