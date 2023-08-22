  import React, { useEffect, useState } from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Deshboard from "./components/deshboard";
  import Services from "./components/Services";
  import Recommend from "./components/Recommend";
  import Testimonials from "./components/Testimonials";
  import Login from "./components/Form";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
import ServicesComponent from "./components/ServicesComponent";
import RecommendComponent from "./components/RecommendComponent";
import TestimonialsComponent from "./components/TestimonialsComponent";

  export default function App() {
    const [userValid,setUserValid]=useState(false)
    useEffect(() => {
     try{
       if(!localStorage.getItem('user').name){
         setUserValid(true)
       }
     }
     catch{
      setUserValid(false)
     }
      // navigate(userValid ? "/" : "/login");
    }, []);
    return (
      <BrowserRouter>
        <Routes>
          {userValid ? (
            <>
              <Route path="/" element={<Deshboard />} />
              <Route path="/services" element={<ServicesComponent />} />
              <Route path="/recommend" element={<RecommendComponent />} />
              <Route path="/testimonials" element={<TestimonialsComponent />} />
            </>
          ) : (
            <Route path="/" element={<Login setUserValid={setUserValid} />} />
          )}
        </Routes>
      </BrowserRouter>
    );
  }
