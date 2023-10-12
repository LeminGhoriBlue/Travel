import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Destination1 from "../assets/Destination1.png";
import Destination2 from "../assets/Destination2.png";
import Destination3 from "../assets/Destination3.png";
import Destination4 from "../assets/Destination4.png";
import Destination5 from "../assets/Destination5.png";
import Destination6 from "../assets/Destination6.png";
import Destination7 from "../assets/Destination7.png";
import Destination8 from "../assets/Destination8.png";
import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";
import axios from "axios";

export default function Recommend({setUserValid}) {
  const [active, setActive] = useState('The Weekend Break');
  const [filterData ,setFilterData] = useState([]); 

  const data = [
    {
      packAgeType:'The Weekend Break',
      image: Destination1,
      title: "Singapore",
      subTitle: "Singapore, officialy thr Republic of Singapore, is a",
      cost: "38,800",
      km: "5000km",
      duration: "Approx 2 night trip",
    },
    {
      packAgeType:'The Package Holiday',
      image: Destination2,
      title: "Thailand",
      subTitle: "Thailand is a Southeast Asia country. It's known for",
      cost: "54,200",
      km: "3000km",
      duration: "Approx 2 night trip",
    },
    {
      packAgeType:'The Group Tour',
      image: Destination3,
      title: "Paris",
      subTitle: "Paris, France's capital, is a major European city and a",
      cost: "45,500",
      km: "7000km",
      duration: "Approx 2 night trip",
    },
    {
      packAgeType:'Long Term Slow Travel',
      image: Destination4,
      title: "New Zealand",
      subTitle: "New Zealand is an island country in the",
      cost: "24,100",
      km: "2000km",
      duration: "Approx 1 night trip",
    },
    {
      packAgeType:'The Package Holiday',
      image: Destination5,
      title: "Bora Bora",
      subTitle: "Bora Bora is a small South Pacific island northwest of",
      cost: "95,400",
      km: "9000km",
      duration: "Approx 2 night 2 day trip",
    },
    {
      packAgeType:'The Group Tour',
      image: Destination6,
      title: "London",
      subTitle: "London, the capital of England and the United",
      cost: "38,800",
      km: "7000km",
      duration: "Approx 3 night 2 day trip",
    },{
      packAgeType:'The Weekend Break',
      image: Destination7,
      title: "New York",
      subTitle: "New  york, often called New york city or NYC , is the most populous city in US.",
      cost: "1,00,000",
      km: "8000km",
      duration: "Approx 15 day trip",
    },
    {
      packAgeType:'The Package Holiday',
      image: Destination8,
      title: "Hong Kong",
      subTitle: "Hong Kong, officially the Hong Kong Special Administrative Region of the People's Republic of China, is a city and a special administrative region in China.",
      cost: "2,50,000",
      km: "9000km",
      duration: "Approx 1 Month trip",
    },
  ];
  const handleBooking = (destination) => {
    try {
      if (!localStorage.getItem('user').name) {
        setUserValid(true);
        const token = JSON.parse(localStorage.getItem("token"));
        console.log(destination);
        const email = JSON.parse(localStorage.getItem("user")).email;
        const data = {
          ...destination,
          email: email // Include the email in the data object
        };
        axios
          .post(
            `http://localhost:5050/add-trip`,
            data,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            window.location.href = "/booking";
          });
      }else {
        setUserValid(false);
      }
    } catch (error) {
      console.log(error);
      setUserValid(false);
alert(error)
    }
  }
  
  const packages = [
    "The Weekend Break",
    "The Package Holiday",
    "The Group Tour",
    "Long Term Slow Travel",
  ];
  useEffect(()=>{
  setActive('The Weekend Break');
   let filterDatas= data.filter((val)=>{
      return val.packAgeType == 'The Weekend Break'
    })
  setFilterData(filterDatas);
  },[]);

const FilterDatafc =(pkt)=>{
  setActive(pkt);
  let filterDatas = data.filter((val)=>{
    return val.packAgeType == pkt
  })
  setFilterData(filterDatas)
}
  return (
    <Section id="recommend">
      <div className="title">
        <h2>Recommended Destinations</h2>
      </div>
      <div className="packages">
        <ul>
          {packages.map((pkg, index) => {
            return (
              <li
                className={active === pkg ? "active" : ""}
                onClick={() => FilterDatafc(pkg)}
              >
                {pkg}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="destinations">
        {filterData.map((destination,ind) => {
          return (
            <div className="destination" key={ind}>
              <img src={destination.image} alt="" />
              <div className="title">
              <h3>{destination.title}</h3>
              <div className="book">
              <button className="book-btn btn" onClick={()=>{handleBooking(destination)}}>Book Now</button>
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
                <span>{destination.km}</span>
                <span>{destination.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
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
