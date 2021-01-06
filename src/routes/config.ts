import { RouteProps } from 'react-router'
import { Home, NoFoundPage, Article, About } from '../pages'

export interface IRouteProps extends RouteProps {
  menu?: boolean
  title?: string
}


export const appRoutes: IRouteProps[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '**',
    component: NoFoundPage
  }
]
