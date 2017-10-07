/**
 * localStorage
 */
const __localStorage = window.localStorage
const NAMESPACE = 'EPM_'

export const keyer = key => NAMESPACE + key

/**
 * 检测是否支持 localStorage
 */
const isSupported = () => {
    const key = '__EPM_TEST_SUPPORTED__'
    try {
        __localStorage.setItem(key, Date.now())
        __localStorage.removeItem(key)
        return true
    } catch (error) {
        return false
    }
}

/**
 * browserStorage
 */
const browserStorage = () => {
    const storage = __localStorage
    return {
        has: key => !!storage[keyer(key)],
        get: (key, typed) => {
            const value = storage.getItem(keyer(key))
            if(!value) return null
            return typed ? typed(value) : JSON.parse(value)
        },
        save: (key, data) => {
            const value = data instanceof Object ? JSON.stringify(data) : data
            storage.setItem(keyer(key), value)
        },
        remove: key => storage.removeItem(keyer(key)),
        clear: () => storage.clear()
    }
}

/**
 * ramStorage
 */
const ramStorage = () => {
    const storage = new Map()
    return {
        has: key => storage.has(keyer(key)),
        get: key => storage.get(keyer(key)),
        save: (key, data) => storage.set(keyer(key), data),
        remove: key => storage.delete(keyer(key)),
        clear: () => storage.clear()
    }
}

/**
 * cacheStore fallback
 * 不支持 localStorage 时，回退 ramStorage
 */
const cacheStore = isSupported() ? browserStorage() : ramStorage()
export default cacheStore
