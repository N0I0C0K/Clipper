import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import TopBar from './components/TopBar'
import { ConfigProvider } from 'antd'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#439a97',
            colorText: '#439A97',
            fontSize: 14,
            borderRadius: 10,
            wireframe: false,
            sizeStep: 4,
            sizeUnit: 4,
          },
        }}
      >
        <TopBar />
        <Home />
      </ConfigProvider>
    </div>
  )
}
