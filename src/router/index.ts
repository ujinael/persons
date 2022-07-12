import { createRouter, createWebHistory } from 'vue-router'
import VLoginPage from '../pages/auth/VLoginPage.vue'
import VDepartmentsPage from '../pages/departments/VDepartmentsPage.vue'
import VEmployerEditPage from '../pages/employers/VEmployerEditPage.vue'
import VEmployersCreatePage from '../pages/employers/VEmployersCreatePage.vue'
import Playground from '../pages/Playground.vue'
const routes = [

{path:'/',
name:'VEmployersCreatePage',
component:VEmployersCreatePage,
meta:{layout:'main-layout',authRequired:true}
  },
  {path:'/auth',
name:'LoginPage',
component:VLoginPage,
meta:{layout:'login-layout'}
  },
  {path:'/departments',
  name:'DepartmentsPage',
  component:VDepartmentsPage,
  meta:{layout:'main-layout'}
    },
  {path:'/employers',
name:'PersonPage',
component:VEmployersCreatePage,
meta:{layout:'main-layout',authRequired:true}
  },
  
  {
    path:'/employers/:id',
    name:'VEmployerEditPage',
component:VEmployerEditPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path: '/playground',
    name: 'VPlayground',
    component: Playground,
    meta:{layout:'main-layout'}
  }
  

  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('account');
  if (authRequired && !loggedIn) {
    return next('/auth');
  }

  next();
})
export default router
