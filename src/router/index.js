import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/dashboard.vue';
// auth page
import Profile from '../components/auth/profile.vue';
/// forgot pass
import Forgot_pass from '../components/auth/forgot_pass.vue';
// login
import Login from '../components/auth/login.vue';
// daily
import DailyIndex from '../components/daily/Index.vue';
// users
import UserIndex from '../components/users/Index.vue';

// chọn số
import ChonSoIndex from '../components/chonso/Index.vue';

// giao số
import GiaoSoIndex from '../components/giaoso/Index.vue';

// nhập số
import NhapSoIndex from '../components/nhapso/Index.vue';

// trả thưởng
import TraThuongIndex from '../components/trathuong/Index.vue';

// kqxs create
import KqxsCreateUpdate from '../components/kqxs/CreateUpdate.vue';

// kết quả xổ số
import KqxsIndex from '../components/kqxs/Index.vue';

// pdf
import PdfIndex from '../components/pdf/Index.vue';

// error 403
import PageNotFoundIndex from '../components/error/403.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
    routes: [
    { path: '/403', name:'403', component: PageNotFoundIndex },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: '',
        component: Login
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            auth: true
        }
    },
    {
        path: '/pdf',
        name: 'pdf',
        component: PdfIndex,
        meta: {
            auth: true
        }
    },
    {
        path: '/forgot-pass',
        name: 'forgot-pass',
        component: Forgot_pass,
        meta: {
            auth: false
        }
    },
    {
        path: '/trang-chu',
        name: 'trang-chu',
        component: Dashboard,
        meta: {
            auth: true
        }
    },
    {
        path: '/dai-ly-ve-so',
        name: 'dai-ly-ve-so',
        component: DailyIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily'],
        }
    },
    {
        path: '/chon-so',
        name: 'chon-so',
        component: ChonSoIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily','user'],
        }
    },
    {
        path: '/users',
        name: 'users',
        component: UserIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily'],
        }
    },
    {
        path: '/nhap-so',
        name: 'nhap-so',
        component: NhapSoIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily'],
        }
    },
    {
        path: '/giao-so',
        name: 'giao-so',
        component: GiaoSoIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily'],
        }
    },
    {
        path: '/tra-thuong',
        name: 'tra-thuong',
        component: TraThuongIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin','daily'],
        }
    }, 
    {
        path: '/kqxs',
        name: 'kqxs',
        component: KqxsIndex,
        meta: {
            auth: true,
            roles:['super_admin','admin'],
        }
    },
    {
        path: '/kqxs-create',
        name: 'kqxs-create',
        component: KqxsCreateUpdate,
        meta: {
            auth: true,
            roles:['super_admin','admin'],
        }
    },
    {
        path: '/kqxs-update',
        name: 'kqxs-update',
        component: KqxsCreateUpdate,
        meta: {
            auth: true,
            roles:['super_admin','admin'],
        }
    }
]
})
