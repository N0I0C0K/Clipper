import { FC, useEffect, useState } from 'react'
import { Button, Input, Typography, message } from 'antd'
import { clearHost, getUrlData, writeToHost } from 'data/data'
import { isAdmin } from 'utils'
import './home.css'

const { Paragraph } = Typography

const UrlItem: FC<{
  url?: string
}> = ({ url = '' }) => {
  const [turl, setUrl] = useState(url)
  return (
    <>
      <Paragraph editable={{ onChange: setUrl }}>{turl}</Paragraph>
    </>
  )
}

const StateBtn: FC = () => {
  const [msgapi, contextHolder] = message.useMessage()
  const [state, SetState] = useState(false)
  useEffect(() => {
    if (!isAdmin) {
      msgapi.warning('需要管理员权限以写入host')
    }
  }, [])
  return (
    <div className="StateBtn" style={{ paddingTop: '20px' }}>
      {contextHolder}
      <Button
        shape="circle"
        style={{
          width: '200px',
          height: '200px',
          fontSize: '30px',
        }}
        onClick={() => {
          if (!state) {
            if (!writeToHost()) msgapi.error('未能写入host')
            else SetState(true)
          } else {
            if (!clearHost()) msgapi.error('未能写入host')
            else SetState(false)
          }
        }}
      >
        {state ? '停止' : '启动'}
      </Button>
    </div>
  )
}

const Home: FC = () => {
  const [urls, setUrls] = useState<string[]>([])
  const [txt, SetText] = useState('')
  useEffect(() => {
    setUrls(getUrlData())
  }, [])
  return (
    <div className="home">
      <StateBtn />
      <div
        className="urls"
        style={{
          paddingTop: '20px',
        }}
      >
        {urls?.map((val) => (
          <UrlItem url={val} key={val} />
        ))}
      </div>
      <div className="submit-block" style={{ paddingTop: '20px' }}>
        <Input.Group compact>
          <Input
            style={{ width: '200px' }}
            defaultValue="https://"
            value={txt}
            onChange={(e) => {
              SetText(e.target.value)
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              if (txt.length <= 0) return
              setUrls([...urls, txt])
              SetText('')
            }}
          >
            添加
          </Button>
        </Input.Group>
      </div>
    </div>
  )
}
export default Home
