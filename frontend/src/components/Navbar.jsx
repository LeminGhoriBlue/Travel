import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link ,useParams} from "react-router-dom";
export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [navActive ,setNavActive]=useState('');
  useEffect(()=>{
    const url = window.location.href;
    const pattern = /\/[^/]+\/([^/]+)/;
    const match = url.match(pattern);
    setNavActive(match?.[1])
  },[])

  console.log(navActive);
  return (
    <>
      <Nav>
        <div className="brand">
          <Link className="container logoLink" >
            <img src={logo} alt="" />
            Travelo
          </Link>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu onClick={() => setNavbarState(true)} />
            )}
          </div>
        </div>

        <ul>
          <li>
            <Link to="/" className={navActive == ''|| navActive == null || navActive == undefined? 'active' : ''} onClick={()=>{setNavActive('')}}>Home</Link>
          </li>
          <li>
            <Link to="/services" className={navActive == 'services' ? 'active' : ''} onClick={()=>{setNavActive('services')}}>About</Link>
          </li>
          <li>
            <Link to="/recommend" className={navActive == 'recommend' ? 'active' : ''} onClick={()=>{setNavActive('recommend')}}>Places</Link>
          </li>
          <li>
            <Link to="/testimonials" className={navActive == 'testimonials' ? 'active' : ''} onClick={()=>{setNavActive('testimonials')}}>Testimonials</Link>
          </li>
        </ul>
      </Nav>
      <ResponsiveNav state={navbarState}>
        <ul>
          <li>
            <Link href="/home" onClick={() => setNavbarState(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={() => setNavbarState(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/recommend" onClick={() => setNavbarState(false)}>
              Places
            </Link>
          </li>
          <li>
            <Link href="/testimonials" onClick={() => setNavbarState(false)}>
              Testimonials
            </Link>
          </li>
        </ul>
      </ResponsiveNav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin:20px 40px 0px 40px;
  .brand {
    .container {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
    }
    .toggle {
      display: none;
    }
  }
  ul {
    display: flex;
    gap: 3rem;
    list-style-type: none;
    li {
      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.4rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
        .active {
          color: #023e8a;
          font-weight: 900;
        
      }
    }
  }
  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    color: white;
    background-color: #48cae4;
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #023e8a;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .toggle {
        display: block;
      }
    }
    ul {
      display: none;
    }
    button {
      display: none;
    }
  }
  .logoLink {
    color: rgb(0, 119, 182);
    font-size: 1.4rem;
    text-decoration: none;
    transition: all 0.1s ease-in-out 0s;
  }
`;

const ResponsiveNav = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  top: ${({ state }) => (state ? "50px" : "-400px")};
  background-color: white;
  height: 30vh;
  width: 100%;
  align-items: center;
  transition: 0.3s ease-in-out;
  ul {
    list-style-type: none;
    width: 100%;
    li {
      width: 100%;
      margin: 1rem 0;
      margin-left: 2rem;

      a {
        text-decoration: none;
        color: #0077b6;
        font-size: 1.2rem;
        transition: 0.1s ease-in-out;
        &:hover {
          color: #023e8a;
        }
      }
      &:first-of-type {
        a {
          color: #023e8a;
          font-weight: 900;
        }
      }
    }
  }
  .logoLink {
    color: rgb(0, 119, 182);
    font-size: 1.4rem;
    text-decoration: none;
    transition: all 0.1s ease-in-out 0s;
  }
`;
