const cnReg = /[\u4e00-\u9fa5]/
// 按长度截断文字，补...，中文 = 2
export default (str, len = 10) => {
    let i = 0
    let j = 0
    let ret = ''
    const text = String(str).trim()
    const max = text.length
    while(j < max && i < len) {
        const c = text.charAt(j)
        ret += c
        j += 1
        i = cnReg.test(c) ? i + 2 : i + 1
    }
    return ret === text ? text : `${ret}...`
}
