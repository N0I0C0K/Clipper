import { FC, useEffect, useState, Component } from 'react'
import { Button, Input, Typography, message } from 'antd'
import {
  clearHost,
  urlData,
  writeToHost,
  addUrl,
  IUrlItem,
  systemState,
} from 'data/data'
import { isAdmin } from 'utils'
import { observer } from 'mobx-react'
import './home.css'

const { Paragraph } = Typography

const UrlItem: FC<{
  url: IUrlItem
}> = ({ url }) => {
  const [turl, setUrl] = useState(url?.url)
  return (
    <>
      <Paragraph
        editable={{
          onChange: systemState.running
            ? (val) => {
                setUrl(val)
                url.url = val
              }
            : undefined,
        }}
      >
        {turl}
      </Paragraph>
    </>
  )
}

const StateBtn: FC = observer(() => {
  const [msgapi, contextHolder] = message.useMessage()
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
          if (!systemState.running) {
            if (!writeToHost()) msgapi.error('未能写入host')
            else systemState.running = true
          } else {
            if (!clearHost()) msgapi.error('未能写入host')
            else systemState.running = false
          }
        }}
      >
        {systemState.running ? '停止' : '启动'}
      </Button>
    </div>
  )
})

const Home: FC = () => {
  const [txt, SetText] = useState('')
  return (
    <div className="home">
      <StateBtn />
      <div
        className="urls"
        style={{
          paddingTop: '20px',
        }}
      >
        {urlData?.map((val) => (
          <UrlItem url={val} key={val.url} />
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
              addUrl(txt)
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
export default observer(Home)
