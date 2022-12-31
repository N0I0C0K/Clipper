import { FC, useEffect, useState, Component } from 'react'
import { Button, Input, Typography, message, Card } from 'antd'
import { clearHost, urlData, writeToHost, addUrl, IUrlItem } from 'data/data'
import { systemState } from 'data/system-state'
import { isAdmin } from 'utils'
import { observer } from 'mobx-react'
import './home.css'
import { autorun } from 'mobx'

const { Paragraph } = Typography

const UrlItem: FC<{
  url: IUrlItem
}> = observer(({ url }) => {
  return (
    <>
      <Paragraph
        editable={
          systemState.running
            ? false
            : {
                onChange: (val) => {
                  if (!systemState.running) url.url = val
                },
              }
        }
      >
        {url.url}
      </Paragraph>
    </>
  )
})

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
          border: 'none',
          boxShadow: !systemState.running
            ? '5px 5px 10px #adc9b5, -5px -5px 10px #e9fff5'
            : '26px 26px 52px #adc9b5,-26px -26px 52px #e9fff5',
          backgroundColor: '#cbedd5',
          transition: '1s',
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
        {systemState.running
          ? `${(systemState.runningTime / 60).toFixed(0).padStart(2, '0')}:${(
              systemState.runningTime % 60
            )
              .toString()
              .padStart(2, '0')}`
          : '启'}
      </Button>
    </div>
  )
})

const Home: FC = () => {
  const [txt, SetText] = useState('')
  return (
    <div className="home">
      <StateBtn />
      <div className="url-card">
        {urlData?.map((val) => (
          <UrlItem url={val} key={val.url} />
        ))}
      </div>
      <div className="submit-block">
        <Input.Group compact>
          <Input
            style={{ width: '200px', backgroundColor: '#cbedd5' }}
            defaultValue=""
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
