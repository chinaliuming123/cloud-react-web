import React, { useEffect, useState } from 'react'
import { Layout, Card, Avatar, Affix, Menu } from 'antd'
import { IRouteProps } from '@/routes/config'
import './index.less'
import { useHistory, useLocation } from 'react-router-dom'

const { Header, Content } = Layout

export interface ILayoutProps {
  menus: IRouteProps[]
}

export function MainLayout(props: React.PropsWithChildren<ILayoutProps>) {
  /**初始化 */
  const history = useHistory()
  const location = useLocation()

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]) // 初始选中的菜单项 key 数组
  /** 点击菜单时 */
  const menuSelect = (result: any) => {
    history.replace(result.key)
  }

  /**生命周期 */
  useEffect(() => {
    setSelectedKeys(() => [location.pathname])
  }, [location])

  return (
    <div className="App">
      <Layout style={{ height: '100%' }}>
        <Affix offsetTop={0}>
          <Header className="header flex">
            <div className="logo">
              <Avatar
                style={{ height: '40px', width: '40px' }}
                src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
              />
            </div>
            <Menu mode="horizontal" onSelect={menuSelect} selectedKeys={selectedKeys} theme="dark">
              <Menu.Item key="/">
                首页
              </Menu.Item>
              <Menu.Item key="/about">
                关于
              </Menu.Item>
              {/* <SubMenu key="/about" title="关于">
                <Menu.Item key="about:1">关于本人</Menu.Item>
                <Menu.Item key="about:2">关于本网站</Menu.Item>
              </SubMenu> */}
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
