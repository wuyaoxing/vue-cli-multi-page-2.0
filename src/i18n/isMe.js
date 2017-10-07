import ellipsis from 'utils/ellipsis'

const titles = {
    'zh-CN': '我',
    'en-US': 'me'
}

export default (user, lang) => {
    user._name = user.name
    user.name = `${ellipsis(user.name, 20)} (${titles[lang]})`
    return user
}
