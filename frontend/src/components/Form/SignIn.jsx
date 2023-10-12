import React,{useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SignInForm({setUserValid}) {
  const [state, setState] = useState({
    name: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!state.name || !state.password) {
      return false;
    }
    await axios
      .post(`http://localhost:5050/login`, {
        name: state.name,
        password: state.password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));  
          setUserValid(true);
        } else {
          alert("Please enter correct details!");
          setUserValid(false)
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error)
      });
  };  
  return (
    <div className="form-container sign-in-container">
      <form >
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        {/* <span>or use your account</span> */}
        <div className="m-10">
          <input
            type="text"
            placeholder="Enter User Name"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* <a href="">Forgot your password?</a> */}
        <button onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
