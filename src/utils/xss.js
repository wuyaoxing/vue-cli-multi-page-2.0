import marked from 'marked'

const whiteList = ['img', 'i']
marked.setOptions({
    breaks: true,
    pedantic: true,
    sanitize: true,
    sanitizer: tag => {
        let tagName = ''
        const hasSpace = tag.indexOf(' ')
        if(hasSpace !== -1) tagName = tag.substring(1, hasSpace)
        else tagName = tag.replace(/<\/?|>/g, '')
        if(whiteList.includes(tagName)) return tag
        return tag.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
})
export default marked
