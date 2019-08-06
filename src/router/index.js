import Loadable from 'react-loadable';
import DelayLoading from '../components/Loading';

const Admin = Loadable({loader: () => import('../pages/Admin'), loading : DelayLoading})
const Home = Loadable({loader: () => import('../pages/Home'), loading : DelayLoading})
const Button = Loadable({loader: () => import('../pages/ui/button'), loading : DelayLoading})
const Ui = Loadable({loader: () => import('../pages/ui/index'), loading : DelayLoading})
const Modals = Loadable({loader: () => import('../pages/ui/modals'), loading : DelayLoading})
const Forms = Loadable({loader: () => import('../pages/form/index'), loading : DelayLoading})
const FormLogin = Loadable({loader: () => import('../pages/form/login'), loading : DelayLoading})
const City = Loadable({loader: () => import('../pages/city'), loading : DelayLoading})
const Order = Loadable({loader: () => import('../pages/order'), loading : DelayLoading})
const OrderDetail = Loadable({loader: () => import('../pages/order/detail'), loading : DelayLoading})
const User = Loadable({loader: () => import('../pages/user'), loading : DelayLoading})

const routes = [
    {
        path: '/admin',
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
            },
            {
                path: '/admin/form',
                component: Forms,
                children: [
                    {
                        path: '/admin/form/login',
                        component: FormLogin
                    }
                ]
            },
            {
                path: '/admin/city',
                component: City
            },
            {
                path: '/admin/order',
                component: Order
            },
            {
                path: '/admin/user',
                component: User
            }
        ]
    },
    {
        path: '/order-detail/:orderId',
        component: OrderDetail
    }
]

export default routes;