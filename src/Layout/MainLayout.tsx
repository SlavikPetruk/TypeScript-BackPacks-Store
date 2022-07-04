import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Featured from '../components/Featured'
import Header from '../components/Header'

const MainLayout:FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Featured />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
