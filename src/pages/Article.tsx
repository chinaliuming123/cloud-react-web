import { getApp } from '@/utils'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { PageHeader } from 'antd'

interface RouteParams {
  id: string
}
interface Article {
  _id: string,
  title: string,
  description: string,
  content: string,
  avatar?: string,
}

export const Article: React.FC<{}> = () => {
  const { id } = useParams<RouteParams>()
  const history = useHistory()
  const app = getApp()
  const db = app.database()
  /**获取数据 */

  const [article, setArticle] = useState<Article>({
    _id: '',
    title: '',
    description: '',
    content: '',
    avatar: '',
  })
  const getData = async () => {
    const { data } = await db.collection('article').doc(id).get()
    console.log(data)
    setArticle(data[0])
  }
  /**生命周期 */
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title={article.title}
        subTitle={article.description}
      />
      <div dangerouslySetInnerHTML={{
        __html: article.content
      }}></div>
    </div>
  )
}