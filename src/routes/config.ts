import { RouteProps } from 'react-router'
import { Home, NoFoundPage } from '../pages'

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
    path: '**',
    component: NoFoundPage
  }
]
