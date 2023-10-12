import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Booking from '../Booking'

function BookingComponent({setUserValid}) {
  return (
    <>
    <Navbar />
            <div style={{ minHeight: "655px" }}>
                <Booking setUserValid={setUserValid}/>
            </div>
            <Footer />
            </>
  )
}

export default BookingComponent