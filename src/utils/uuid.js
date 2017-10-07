// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/873856#comment34003086_8809472
export default () => {
    let d = Date.now() + performance.now() // use high-precision timer if available
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + (Math.random() * 16)) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16)
    })
}
