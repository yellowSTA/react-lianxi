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
const BikeMap = Loadable({loader: () => import('../pages/map/bikeMap'), loading : DelayLoading})
const Charts = Loadable({loader: () => import('../pages/charts/index'), loading : DelayLoading})
const Bar = Loadable({loader: () => import('../pages/charts/bar'), loading : DelayLoading})
const Pie = Loadable({loader: () => import('../pages/charts/pie'), loading : DelayLoading})
const Line = Loadable({loader: () => import('../pages/charts/line'), loading : DelayLoading})
const Rich = Loadable({loader: () => import('../pages/rich'), loading : DelayLoading})
const Permission = Loadable({loader: () => import('../pages/permission'), loading : DelayLoading})

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
            },
            {
                path: '/admin/bikeMap',
                component: BikeMap
            },
            {
                path: '/admin/charts',
                component: Charts,
                children: [
                    {
                        path: '/admin/charts/bar',
                        component: Bar
                    },
                    {
                        path: '/admin/charts/pie',
                        component: Pie
                    },
                    {
                        path: '/admin/charts/line',
                        component: Line
                    }
                ]
            },
            {
                path: '/admin/rich',
                component: Rich
            },
            {
                path: '/admin/permission',
                component: Permission
            }
        ]
    },
    {
        path: '/order-detail/:orderId',
        component: OrderDetail
    }
]

export default routes;