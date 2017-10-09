import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const isDevMode = process.env.NODE_ENV !== 'production'

// 覆盖原生函数，还原被 url 编码的 `/`
const nativeEncode = encodeURIComponent
window.encodeURIComponent = str => nativeEncode(str).replace(/%2f/ig, '/')

// const AsyncComp = pagePath => () => import(`views/${pagePath}`)

const collect = {
    path: '/collect',
    name: 'collect',
    icon: 'epm-icon-star-o',
    component: () => import(
        /* webpackChunkName: "collect" */
        'views/collect/collect'
    )
}

const projects = {
    path: '/projects',
    alias: '/',
    name: 'projects',
    icon: 'epm-icon-file',
    component: () => import(
        /* webpackChunkName: "projects" */
        'views/project/projects'
    )
}

export const devNavRoutes = [
    collect,
    projects,
    {
        path: '/folder',
        name: 'folder',
        icon: 'epm-icon-docs',
        component: () => import(
            /* webpackChunkName: "folder" */
            'views/folder/folder'
        )
    }, {
        path: '/team',
        name: 'team',
        icon: 'epm-icon-team',
        component: () => import(
            /* webpackChunkName: "team" */
            'views/team/team'
        )
    }
]

export const prodNavRoutes = [collect, projects]

export const navRoutes = isDevMode ? devNavRoutes : prodNavRoutes

export default new Router({
    routes: [
        ...navRoutes,
        {
            name: 'project',
            path: '/projects/:projectId',
            component: () => import(
                /* webpackChunkName: "project" */
                'views/project/project'
            )
        },
        {
            name: '404',
            path: '/404',
            component: () => import(
                /* webpackChunkName: "404" */
                'views/404/404'
            )
        }, {
            path: '*',
            redirect: {
                name: '404'
            },
        }
    ]
})
