import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home'
import './scss/app.scss'

const Cart = React.lazy(()=> import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = React.lazy(()=> import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))
const BackPackPage = React.lazy(()=> import(/* webpackChunkName: "FullBackPack" */ './pages/PacksPage'))


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Cart Loading...</div>}>
            <Cart/>
          </Suspense>
        } />
        <Route path="*" element={<Suspense fallback={<div>Cart Loading...</div>}><NotFound /></Suspense>} />
        <Route path="backpack/:id" element={<Suspense fallback={<div>Cart Loading...</div>}><BackPackPage /></Suspense>} />
      </Route>
    </Routes>
  )
}

export default App
