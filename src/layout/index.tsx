import React from 'react'
import { Layout, Card, Avatar } from 'antd'
// import { useHistory } from 'react-router'
import { IRouteProps } from '@/routes/config'
import { config } from '@/config'
import './index.less'

const { Header, Content } = Layout

export interface ILayoutProps {
  menus: IRouteProps[]
}

export function MainLayout(props: React.PropsWithChildren<ILayoutProps>) {

  return (
    <div className="App">
      <Layout style={{ height: '100%' }}>
        <Header className="header flex">
          <div className="logo">
            <Avatar
              style={{ height: '40px', width: '40px' }}
              src={`${config.storageBaseUrl}/icon.png`}
            />
          </div>
          <div className="home">
            <a href="/">Home</a>
          </div>
        </Header>
        <Content style={{ padding: '0 50px', display: 'flex', flexDirection: 'column' }}>
          <Layout style={{ padding: '24px 0', flex: '1 1 auto', background: '#fff' }}>
            <Content style={{ padding: '0 24px' }}>
              <Card className="card" bordered={false}>
                <div className="card-content" style={{ overflow: 'auto' }}>
                  {props.children}
                </div>
              </Card>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  )
}
