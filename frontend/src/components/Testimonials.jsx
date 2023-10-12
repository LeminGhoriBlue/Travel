import React from "react";
import styled from "styled-components";
import customer from "../assets/customer.png";
import customer1 from "../assets/customer1.png";
import customer2 from "../assets/customer2.png";
import customer3 from "../assets/customer3.png";
export default function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Happy Customers</h2>
      </div>
      <div className="testimonials">
        <div className="testimonial">
          <p>
            “When you check in, you are letting the airline know you have arrived. If the person you are talking to tells you to go to the check-in counter, you can follow up this question with “how do I get to the check-in counter?” ”
          </p>
          <div className="info">
            <img src={customer} alt="" />
            <div className="details">
              <h4>Kishan Sheth</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
            "As you can guess from the name, the information desk is where you can learn everything you need to know about getting around the airport. You can even ask for a map (a picture guide of the area) from them."
          </p>
          <div className="info">
            <img src={customer2} alt="" />
            <div className="details">
              <h4>Chutki</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
          A restroom is a place where you take care of personal business like combing your hair, washing your face or using the toilet. Depending on the country you are visiting, this room may also be called a bathroom, washroom, comfort room, loo or toilet.
          </p>
          <div className="info">
            <img src={customer1} alt="" />
            <div className="details">
              <h4>Tom</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
          This phrase is the standard and polite way to ask for something that is usually free or something you do not have to pay for. For example, if you are thirsty, you might say “I would like a glass of water, please.” 
          </p>
          <div className="info">
            <img src={customer3} alt="" />
            <div className="details">
              <h4>Sujuka</h4>
              <span>CEO - Shashaan Web Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
