import imgError from 'images/img_error.jpg'

// 图片加载失败时替换为一个默认图片
document.addEventListener('error', ({ target }) => {
    if(target.tagName === 'IMG') {
        target.src = imgError
        target.title = 'Image loading failed'
    }
}, true)
