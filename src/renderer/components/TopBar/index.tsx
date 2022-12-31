import { FC } from 'react'
import './topbar.css'
import {
  MinusOutlined,
  CloseOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'

const TopBar: FC = () => {
  return (
    <div className="top-bar">
      <CloseOutlined />
      <MinusOutlined />
      <FullscreenOutlined />
    </div>
  )
}

export default TopBar
