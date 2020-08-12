import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Banner from '@/components/banner/Banner.vue'
import Login from '@/components/login/Login.vue'
import Register from '@/components/register/Register.vue'
import noteClass from '@/components/noteClass/noteClass.vue'
import noteList from '@/components/noteList/noteList.vue'
import noteDetail from '@/components/noteDetail/noteDetail'
import pulishNote from '@/components/pulishNote/pulishNote'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        title:"LPieces笔记" //动态显示标题使用这个值
      }
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner,
      meta:{
        title:"欢迎"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:"登录"
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta:{
        title:"注册"
      }
    },
    {
      path: '/noteclass',
      name: 'noteClass',
      component: noteClass,
      meta:{
        title:"笔记分类"
      }
    },
    {
      path: '/notelist',
      name: 'noteList',
      component: noteList,
      meta:{
        title:"笔记列表"
      }
    },
    {
      path: '/notedetail',
      name: 'noteDetail',
      component: noteDetail,
      meta:{
        title:"笔记详情"
      }
    },
    {
      path: '/pulishnote',
      name: 'pulishNote',
      component: pulishNote,
      meta:{
        title:"写笔记"
      }
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.userInfo ? true : false;
  if(to.path == '/login' || to.path == '/' || to.path == '/banner' || to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
})

export default router
