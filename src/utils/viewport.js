// calculateDpr
export default () => {
    const dpr = window.devicePixelRatio || 1
    const docEl = document.documentElement
    docEl.setAttribute('data-dpr', dpr)

    const rem = (docEl.clientWidth * dpr) / 10
    const fontEl = document.createElement('style')
    docEl.firstElementChild.appendChild(fontEl)
    fontEl.innerHTML = `html {font-size: ${rem}px!important;}`

    const metaEl = document.querySelector('meta[name="viewport"]')
    const scale = 1 / dpr
    metaEl.setAttribute('content', `initial-scale=${scale},maximum-scale=${scale}, minimum-scale=${scale},user-scalable=no`)
}
