import { FC, useState } from 'react'
import { Button, Input, Typography } from 'antd'
import './home.css'
import { text } from 'stream/consumers'

const { Paragraph } = Typography

const Home: FC = () => {
  const [txt, SetText] = useState('111')
  return (
    <div className="home">
      <Button
        shape="circle"
        style={{ width: '200px', height: '200px', fontSize: '30px' }}
      >
        启动
      </Button>
      <div className="urls" style={{ paddingTop: '20px' }}>
        <Paragraph editable={{ onChange: SetText }}>{txt}</Paragraph>
      </div>
      <div className="submit-block" style={{ paddingTop: '20px' }}>
        <Input.Group compact>
          <Input style={{ width: '200px' }} defaultValue="https://ant.design" />
          <Button type="primary">Submit</Button>
        </Input.Group>
      </div>
    </div>
  )
}
export default Home
