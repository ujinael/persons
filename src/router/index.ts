import { createRouter, createWebHistory } from 'vue-router'
import VLoginPage from '../pages/auth/VLoginPage.vue'
import VDepartmentsPage from '../pages/departments/VDepartmentsPage.vue'
import VEmployerEditPage from '../pages/employers/VEmployerEditPage.vue'
import VEmployersCreatePage from '../pages/employers/VEmployersCreatePage.vue'
import VClientsListPage from '../pages/clients/VClientsListPage.vue'
import VClientDetailPage from '../pages/clients/VClientDetailPage.vue'
import VSpecialitiesPage from '../pages/specialities/VSpecialitiesPage.vue'
import Playground from '../pages/Playground.vue'
import VNomenclatureListPage from '../pages/nomenclature/VNomenclatureListPage.vue'
import VPriceListPage from '../pages/prices/VPriceListPage.vue'
import VPriceDetaiPage from '../pages/prices/VPriceDetail.vue'
import VTimetableDetailPage from '../pages/timetable/VTimetableDetailPage.vue'
import VTimetableListPage  from '../pages/timetable/VTimetableListPage.vue'
import VRequestSchedullerPageVue from '../pages/request_schedulle/VRequestSchedullerPage.vue'
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
name:'VEmployersCreatePage',
component:VEmployersCreatePage,
meta:{layout:'main-layout',authRequired:true}
  },
  
  {
    path:'/employers/:id',
    name:'VEmployerEditPage',
component:VEmployerEditPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {path:'/clients',
  name:'VClientsListPage',
  component:VClientsListPage,
  meta:{layout:'main-layout',authRequired:true}
    },
    
    {
      path:'/clients/:id',
      name:'VClientsDetailPage',
  component:VClientDetailPage,
  meta:{layout:'main-layout',authRequired:true },
    },
  {
    path:'/specialities',
    name:'VSpecialitiesPage',
component:VSpecialitiesPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/nomenclature',
    name:'VNomenclatureListPage',
component:VNomenclatureListPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/prices',
    name:'VPriceListPage',
component:VPriceListPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/prices/:id',
    name:'VPriceDetaiPage',
component:VPriceDetaiPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/timetable',
    name:'VTimetableListPage',
component:VTimetableListPage,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/scheduller',
    name:'VRequestSchedullerPageVue',
component:VRequestSchedullerPageVue,
meta:{layout:'main-layout',authRequired:true },
  },
  {
    path:'/timetable/:id',
    name:'VTimetableDetailPage',
component:VTimetableDetailPage,
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
