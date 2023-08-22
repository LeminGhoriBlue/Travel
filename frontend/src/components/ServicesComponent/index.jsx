import React from 'react'
import Navbar from '../Navbar'
import Services from '../Services'
import Footer from '../Footer'

function ServicesComponent() {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: "732px" }}>
                <Services />
            </div>
            <Footer />
        </>
    )
}

export default ServicesComponent
