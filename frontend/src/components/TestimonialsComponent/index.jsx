import React from 'react'
import Navbar from '../Navbar'
import Testimonials from '../Testimonials'
import Footer from '../Footer'

function TestimonialsComponent({setUserValid}) {
  return (
    <>
        <Navbar/>
        <div style={{minHeight:"655px"}}>
        <Testimonials />
        </div>
        <Footer/>
    </>
  )
}

export default TestimonialsComponent
