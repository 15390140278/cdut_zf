import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import Home from '../views/Home/index.vue'
import Main from '../views/Home/components/main.vue'
import HouseDetail from '../views/Home/components/HouseDetail.vue'
import Profile from '../views/Profile/index.vue'
import Welcome from '../views/Profile/components/welcome.vue'
import RentInfo from '../views/Profile/components/rentInfo.vue'
import ChangePassword from '../views/Profile/components/changePassword.vue'
import ChangeProfile from '../views/Profile/components/changeProfile.vue'
import PublishHouseInfo from '../views/Profile/components/publishHouseInfo.vue'

import BackgroundSystem from '../views/BackgroundSystem/index.vue'
import Bwelcome from '../views/BackgroundSystem/components/Bwelcome.vue'
import BaddHouseInfo from '../views/BackgroundSystem/components/BaddHouseInfo.vue'
import BhouseInfo from '../views/BackgroundSystem/components/BhouseInfo.vue'
import Buser from '../views/BackgroundSystem/components/Buser.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/home',
      component: Home,
      redirect: '/main',
      children: [
        {
          path: '/housedetail/login',
          redirect: '/login'
        },
        {
          path: '/housedetail/profile',
          redirect: '/profile'
        },
        {
          path: '/housedetail/:id',
          component: HouseDetail
        },
        {
          path: '/main',
          component: Main
        }
      ]
    },
    {
      path: '/profile',
      component: Profile,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/rentinfo', component: RentInfo },
        { path: '/changepassword', component: ChangePassword },
        { path: '/changeprofile', component: ChangeProfile },
        { path: '/publishhouseinfo', component: PublishHouseInfo }
      ]
    },
    {
      path: '/backgroundsystem',
      component: BackgroundSystem,
      redirect: '/bwelcome',
      children: [
        { path: '/bwelcome', component: Bwelcome },
        { path: '/buser', component: Buser },
        { path: '/baddhouseinfo', component: BaddHouseInfo },
        { path: '/bhouseinfo', component: BhouseInfo }
      ]
    },
    {
      path: '*',
      component: resolve => require(['../views/error404.vue'], resolve)
    },
    { path: '/', redirect: '/home' }
  ]
})

export default router
