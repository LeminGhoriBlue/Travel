import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
function Booking({setUserValid}) {
  const [trips, setTrips] = useState([]);
  
  const fetchTripData = async () => {
    try {
      const email = JSON.parse(localStorage.getItem("user")).email;
      const token = JSON.parse(localStorage.getItem("token"));
      // Set up headers for authentication
      const headers = {
        authorization: token,
      };

      // Make the GET request to your API
      const response =  await axios.get(`http://localhost:5050/api/trips?email=${email}`, {
        headers, // Include the token in the request headers
      });

      // Set the fetched trips in state
      setTrips(response.data);
    } catch (error) {
      console.error(error);
      alert(error)
      // Handle errors as needed
    }
  };
  useEffect(()=>{
      try {
        if (!localStorage.getItem('user').name) {
          setUserValid(true);
        fetchTripData();
        }
      } catch (error) {
        console.log(error);
        setUserValid(false);
  
      }
  },[]);
  const handleDelete = async (destination) => {
    const email = JSON.parse(localStorage.getItem("user")).email;
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      if (!token) {
        console.error('Token not provided');
        return;
      }

      const headers = {
        authorization: token,
      };

      const response = await axios.delete('http://localhost:5050/delete-trip', {
        params: {
          email: email,
          title: destination.title,
        },
        headers: headers, // Corrected the placement of headers
      });

      if (response.status === 200) {
        console.log('Trip Data deleted successfully');
        fetchTripData()
      } else {
        console.log('Trip data not found');
        alert('Trip data not found');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Token is invalid');
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <Section>
      <h1>Your Trips</h1>
      <div className="destinations">
        {trips?.map((destination,ind) => {
          return (
            <div className="destination" key={ind}>
              <img src={destination.image} alt="" />
              <div className="title">
              <h3>{destination.title}</h3>
              <div className="book">
              <button className="book-btn btn" onClick={()=>{handleDelete(destination)}}>Cancel Booking</button>
              </div>
              </div>
              <p>{destination.subTitle}</p>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <h4>{destination.cost}</h4>
              </div>
              <div className="distance">
                <span>1000 Kms</span>
                <span>{destination.duration}</span>
              </div>
            </div>
          );
        })}
        {trips.length ==0 &&
        <div><b>Not Found Data</b> <div><a href='/recommend'>Select A Trip</a></div> </div>
        }
          {/* */}
        
        
      </div>
    </Section>
  )
}
const Section = styled.section`
  padding: 2rem 0;
  h1{
    font-size: 50px;
    text-align: center;
    margin: 30px 0px;
  }
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .title{
    .book{
      margin: 0px 68px;
      .btn {
        box-sizing: border-box;
        appearance: none;
        background-color: transparent;
        border: 2px solid #e74c3c;
        border-radius: 0.6em;
        color: #e74c3c;
        cursor: pointer;
        display: flex;
        align-self: center;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1;
        margin: 20px;
        padding: 1.2em 2.8em;
        text-decoration: none;
        text-align: center;
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
      
        .btn:hover,
        .btn:focus {
          color: #fff;
          outline: 0;
        }
      }      
      .book-btn {
        color: #6f6f9d;
        border-color: #ceced7;
        background: {
          image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
          position: 100%;
          size: 400%;
        }
        transition: background 300ms ease-in-out;
        
        &:hover {
          background-position: 0;
        }
      }
    }
  }
  
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
  
`;


export default Booking;