import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

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
  }
]

export const asyncRoutes = [
  
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',  
    children: [
      {
        path: 'dashboard',
        name: 'Tableau',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Tableau de bord',  icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/essai-liste',
    component: Layout,
    name: 'Essai',
    meta: {
      title: "Constitution d'un dossier",
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/essai/create'),
        name: 'ConstruireAnnexB',
        meta: { title: 'Créer  un essai clinique (Annexe B)', icon: 'edit', breadcrumb: false, activeMenu: '/essai/index', roles: ['promo'] },
        hidden: true
      },
      {
        path: 'edit/:id(\\w+)',
        component: () => import('@/views/essai/edit'),
        name: 'Consulter',
        meta: { title: 'Consulter', noCache: true, activeMenu: '/essai-liste/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/essai/list'),
        name: 'liste des essais cliniques',
        meta: { title: 'Essais cliniques', icon: 'nested' }
      },
      {
        path: 'soumisstion',
        component: () => import('@/views/essai/show'),
        name: 'Essais cliniques',
        meta: { title: 'Soumission du dossier', icon: 'nested', activeMenu: '/essai/index', roles: ['promo']  },
        hidden: true
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
        name: 'Créer un essai clinique',
        meta: { title: 'Créer un essai clinique', icon: 'form' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: {
      roles: ['admin']
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
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  {
    path: '/evaluateur',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'Evalueteurs',
        component: () => import('@/views/evaluateur/index'),
        meta: { title: 'Evaluateurs', icon: 'form' }
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
