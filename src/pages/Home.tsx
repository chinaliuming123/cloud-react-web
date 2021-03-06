import React, { useState, useEffect } from 'react'
import { Row, Col, Button, List, Avatar, Space } from 'antd'
import { getApp } from '@/utils'
import { useHistory } from 'react-router-dom'
import { LikeOutlined } from '@ant-design/icons';

interface Article {
  _id: string,
  title: string,
  description: string,
  content: string,
  avatar?: string,
  like: number
}
export const Home: React.FC<{}> = () => {
  /**初始化 */
  const app = getApp()
  const db = app.database()
  const history = useHistory()
  const auth = app.auth();
  const [loginLoading, setLoginLoading] = useState(false)

  /** 列表 */
  const [listData, setlistData] = useState([])
  const getListData = async () => {
    const loginState = await auth.getLoginState();
    console.log(loginState.isAnonymous); // true
    if (loginState.isAnonymous) {
      //获取数据库数据
      const { data } = await db.collection('article').get()
      setlistData([...listData, data])
    }
  }
  const IconText = (result: any) => (
    <Space>
      {React.createElement(result.icon)}
      {result.text}
    </Space>
  );

  /**点击标题 */
  const titleClick = (id: string) => {
    history.push(`/article/${id}`)
  }

  /** 登录,获取数据 */
  async function login() {
    setLoginLoading(true)
    await auth.anonymousAuthProvider().signIn();
    // 匿名登录成功检测登录状态isAnonymous字段为true
    setLoginLoading(false)
  }
  /** 生命周期 */
  useEffect(() => {
    getListData() // 获取数据
  }, [])

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        loading={loginLoading}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        renderItem={(item: Article) => (
          <List.Item
            key={item.title}
            actions={[
              // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
              // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={200}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a onClick={() => titleClick(item._id)} color="orange">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <Row>
        <Col span={8} offset={8}>
          <Button onClick={login}>登录</Button>
        </Col>
      </Row>
    </div>
  )
}
