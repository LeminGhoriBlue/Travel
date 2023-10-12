  import React, { useEffect, useState } from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Deshboard from "./components/deshboard";
  import Login from "./components/Form";
import ServicesComponent from "./components/ServicesComponent";
import RecommendComponent from "./components/RecommendComponent";
import TestimonialsComponent from "./components/TestimonialsComponent";
import BookingComponent from "./components/BookingComponent";
import "./index.css"
  export default function App() {
    const [userValid,setUserValid]=useState(true);
    return (
      <BrowserRouter>
        <Routes>
          {userValid ? (
            <>
              <Route path="/" element={<Deshboard setUserValid={setUserValid}/>} />
              <Route path="/services" element={<ServicesComponent />} />
              <Route path="/recommend" element={<RecommendComponent setUserValid={setUserValid}/>} />
              <Route path="/testimonials" element={<TestimonialsComponent />} />
              <Route path="/booking" element={<BookingComponent setUserValid={setUserValid}/>} />
              {/* <Route path="/booktrip" element={<BookTrip />} /> */}
              <Route path="*  " element={<Deshboard setUserValid={setUserValid}/>} />
            </>
          ) : (
            <Route path="*" element={<Login setUserValid={setUserValid} />} />
          )}
        </Routes>
      </BrowserRouter>
    );
  }
