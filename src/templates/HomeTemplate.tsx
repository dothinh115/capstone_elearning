import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'

type Props = {}

const HomeTemplate = (props: Props) => {
  return (
    <>
        <Header />
        <div className="container">
        <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default HomeTemplate