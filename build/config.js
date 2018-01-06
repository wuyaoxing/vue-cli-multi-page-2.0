// cn, en 页面title
exports.cn = {
    index: '页面 - 导航',
    login: 'EasyPM - 登录',
    easypm: '工作台',
    test: '测试页面'
}

exports.en = {
    index: 'index',
    login: 'login',
    easypm: 'easypm',
    test: 'test'
}

// 输出文件名称
exports.outputSource = {
    index: 'index.jsp',
    login: 'login.jsp',
    easypm: 'easypm.jsp',
    test: 'test.jsp',
}

// 打包输出ignore目录
exports.prodIgnore = ['index']

// 页面输出模板
exports.hbsSource = {
    index: `<div id="app"></div>`,
    login: `<login id="app"></login>`,
    easypm: `<div id="app"></div>`,
    test: `<div id="app"></div>`,
}
