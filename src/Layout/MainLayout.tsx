import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Featured from '../components/Featured'
import Header from '../components/Header'

const MainLayout:FC = () => {  
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />
      {location.pathname === '/' && <Featured />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
