import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import FirstSignUpView from '../views/FirstSignUpView.vue'
import SecondSignUpView from '../views/SecondSignUpView.vue'
import BoardInfoView from '../views/BoardInfoView.vue'
import NewBoardView from '../views/NewBoardView.vue'
import BoardDetailView from '../views/BoardDetailView.vue'
import NewListView from '../views/NewListView.vue'
import NewCardView from '../views/NewCardView.vue'
import CommentListView from '@/components/CommentList.vue'
import CommentsView from '@/components/Comments.vue'
import ParentCommentView from '@/components/ParentComment.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/first/signup',
    name: 'firstsignup',
    component: FirstSignUpView
  },
  {
    path: '/second/signup',
    name: 'secondsignup',
    component: SecondSignUpView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/board/info',
    name: 'boardinfo',
    component: BoardInfoView
  },
  {
    path: '/new/board',
    name: 'newboard',
    component: NewBoardView
  },
  {
    path: '/board/detail',
    name: 'boarddetail',
    component: BoardDetailView
  },
  {
    path: '/new/list',
    name: 'newlist',
    component: NewListView
  },
  {
    path: '/new/card',
    name: 'newcard',
    component: NewCardView
  },
  {
    path: '/comments',
    name: 'comments',
    component:CommentsView
  },
  {
    path: '/commentlist',
    name: 'commentlist',
    component:CommentListView
  },
  {
    path: '/parentcomment',
    name: 'parentcomment',
    component:ParentCommentView
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
