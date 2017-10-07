/**
 * bytesToSize 计算文件大小
 * 调用方法：bytesToSize(1073741824)
 * 1073741824等于1GB
 */
export default (bytes) => {
    if (bytes === 0) return '0 B'

    const k = 1024

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${(bytes / Math.pow(k, i)).toPrecision(3)} ${sizes[i]}`
}
