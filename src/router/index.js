import Loadable from 'react-loadable';
import DelayLoading from '../components/Loading';

const Admin = Loadable({loader: () => import('../pages/Admin'), loading : DelayLoading})
const Home = Loadable({loader: () => import('../pages/Home'), loading : DelayLoading})
const Button = Loadable({loader: () => import('../pages/ui/button'), loading : DelayLoading})
const Ui = Loadable({loader: () => import('../pages/ui/index'), loading : DelayLoading})
const Modals = Loadable({loader: () => import('../pages/ui/modals'), loading : DelayLoading})

const routes = [
    {
        path: '/',
        component: Admin,
        children: [
            {
                path: '/admin/home',
                component: Home,
                exact: true
            },
            {
                path: '/admin/ui',
                component: Ui,
                redirect: '/admin/ui/buttons',
                exact: true,
                children: [
                    {
                        path: '/admin/ui/buttons',
                        component: Button
                    },
                    {
                        path: '/admin/ui/modals',
                        component: Modals
                    }
                ]
            }
        ]
    }
]

export default routes;