import Home from './demo/home';
import About from './demo/about';
import Topic from './demo/topic';
import User from './demo/user';
import UserAdd from './demo/userAdd';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: true
    },
    {
        path: '/topic',
        component: Topic,
        exact: true
    },
    {
        path: '/user',
        component: User,
        exact: true,
        children: [
            {
                path: '/user/add',
                exact: true,
                component: UserAdd
            }
        ]
    }
]

export default routes;