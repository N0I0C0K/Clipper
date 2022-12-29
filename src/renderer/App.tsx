import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import Home from './pages/home/home'
import './App.css'
import TopBar from './components/TopBar'

export default function App() {
  return (
    <>
      <TopBar />
      <Home />
    </>
  )
}
