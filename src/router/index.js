import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/essai-liste',
    component: Layout,
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/essai/create'),
        name: 'CreateArticle',
        meta: { title: 'Creer un essai clinique(2)', icon: 'edit', breadcrumb: false, activeMenu: '/essai/index', roles: ['promo'] },
        hidden: true
      },
      {
        path: 'edit/:id(\\w+)',
        component: () => import('@/views/essai/edit'),
        name: 'EditArticle',
        meta: { title: 'List des ', noCache: true, activeMenu: '/essai-liste/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/essai/list'),
        name: 'Essais cliniques',
        meta: { title: 'Essais cliniques', icon: 'nested' }
      }
    ]
  },
  {
    path: '/essai',
    component: Layout,
    redirect: '/essai/index',
    meta: {
      title: 'Excel',
      icon: 'excel',
      roles: ['promo']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/essai/index'),
        name: 'Creer un essai clinique',
        meta: { title: 'Creer un essai clinique', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: {
      roles: ['eval']
    },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Promoteurs', icon: 'form' }
      }
    ]
  },
  {
    path: '/evaluateur',
    component: Layout,
    meta: {
      roles: ['valid']
    },
    children: [
      {
        path: 'index',
        name: 'Evalueteur',
        component: () => import('@/views/evaluateur/index'),
        meta: { title: 'Evalueteur', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
