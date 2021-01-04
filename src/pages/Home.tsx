import React, { useState } from 'react'
import { Row, Col, Input } from 'antd'
import { getApp } from '@/utils'
// import { config } from '@/config'

const { Search } = Input

export const Home: React.FC<{}> = () => {
  const app = getApp()
  const db = app.database()
  const [loginLoading, setLoginLoading] = useState(false)

  const customLogin = async () => {
    setLoginLoading(true)
    const auth = app.auth();
    await auth.anonymousAuthProvider().signIn();
    // 匿名登录成功检测登录状态isAnonymous字段为true
    const loginState = await auth.getLoginState();
    console.log(loginState.isAnonymous); // true

    const res = await db.collection('todos').get()
    console.log(res)
    setLoginLoading(false)
  }

  return (
    <div>
      <Row>
        <Col span={8} offset={8}>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Search
            size="middle"
            placeholder="输入你的用户名，用户名长度必须大于 4 位，由字母和数字组成"
            enterButton="自定义登录"
            loading={loginLoading}
            onSearch={customLogin}
          />
        </Col>
      </Row>
    </div>
  )
}
