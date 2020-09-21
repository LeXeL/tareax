import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '../views/Home.vue'
import SearchResults from '@/views/SearchResults'
import UserPublications from '@/views/UserPublications'
import NewPublication from '@/views/NewPublication'
import Profile from '@/views/Profile'
import MyPublications from '@/views/MyPublications'
import ResetPassword from '@/views/ResetPassword'
import ForgotPassword from '@/views/ForgotPassword'
import Admin from '@/views/Admin'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login')
}
const ifAuthenticatedAndAdmin = (to, from, next) => {
    if (store.getters.isAuthenticated && store.getters.role === 'admin') {
        next()
    } else next('/')
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/search/:id',
        name: 'SearchResults',
        component: SearchResults,
    },
    {
        path: '/user-publications',
        name: 'UserPublications',
        component: UserPublications,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/new-publication',
        name: 'NewPublication',
        component: NewPublication,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/my-publications',
        name: 'MyPublications',
        component: MyPublications,
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: ifAuthenticatedAndAdmin,
    },
    {
        path: '/resetpassword',
        name: 'reset password',
        component: ResetPassword,
    },
    {
        path: '/forgotpassword',
        name: 'forgot password',
        component: ForgotPassword,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
