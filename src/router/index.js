import App from '../ui/App.jsx'

import component from './component'
import npm from './npm'

export default {
    path: '',
    component: App,
    name: 'page-app',
    childRoutes: [
        component,
        npm,
        
        {
            path: 'home',
            name: 'home',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('../ui/pages/Home').default)
                }, 'home')
            },
            isIndex: true
        },
        {
            path: 'about',
            name: 'about',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require('../ui/pages/About').default)
                }, 'about')
            }
        }
    ]
}