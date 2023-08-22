import React, { useEffect } from 'react'
import Hero from "../Hero";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";
import Services from "../Services";
import Recommend from "../Recommend";
import Testimonials from "../Testimonials";
import Footer from "../Footer";
import scrollreveal from "scrollreveal";

function Deshboard() {
  useEffect(()=>{
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: true,
    });
    sr.reveal(
      `
        nav,
        #hero,
        #services,
        #recommend,
        #testimonials,
        footer
        `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  },[])
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Deshboard
