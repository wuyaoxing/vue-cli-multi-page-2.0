import Cache, { keyer } from 'util/cache'

const KEY = 'IS_LOGIN'
const LOGIN_VAL = '1'
const LOGOUT_VAL = '0'

window.addEventListener('storage', e => {
    if(e.key !== keyer(KEY)) return
    if(e.newValue === LOGOUT_VAL && e.oldValue === LOGIN_VAL) {
        location.href = '/logout'
    }
    if(e.newValue === LOGIN_VAL && e.oldValue === LOGOUT_VAL) {
        location.href = '/'
    }
})

export const login = () => Cache.save(KEY, LOGIN_VAL)
export const logout = () => Cache.save(KEY, LOGOUT_VAL)
