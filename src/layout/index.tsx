import React from 'react'
import { Layout, Card, Avatar, Affix, Menu } from 'antd'
// import { useHistory } from 'react-router'
import { IRouteProps } from '@/routes/config'
import { config } from '@/config'
import './index.less'

const { Header, Content } = Layout
const { SubMenu } = Menu;


export interface ILayoutProps {
  menus: IRouteProps[]
}

export function MainLayout(props: React.PropsWithChildren<ILayoutProps>) {

  return (
    <div className="App">
      <Layout style={{ height: '100%' }}>
        <Affix offsetTop={0}>
          <Header className="header flex">
            <div className="logo">
              <Avatar
                style={{ height: '40px', width: '40px' }}
                src={`${config.storageBaseUrl}/icon.png`}
              />
            </div>
            <Menu mode="horizontal" theme="dark">
              <Menu.Item key="mail">
                Navigation One
              </Menu.Item>
              <Menu.Item key="app">
                Navigation Two
              </Menu.Item>
              <SubMenu key="SubMenu" title="Navigation Three - Submenu">
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Header>
        </Affix>
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
