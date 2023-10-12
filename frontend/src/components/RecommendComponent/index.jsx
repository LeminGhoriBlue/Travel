import React from 'react'
import Navbar from '../Navbar'
import Recommend from '../Recommend'
import Footer from '../Footer'

function RecommendComponent({setUserValid}) {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: "655px" }}>
                <Recommend setUserValid={setUserValid}/>
            </div>
            <Footer />
        </>
    )
}

export default RecommendComponent
