import React from "react";
import axios from "axios"
function SignUpForm({ setType }) {

  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.password) {
      // setError(true);
      return false;
    }
    if (state.name !== "" || state.email !== "" || state.password !== "") {
      await axios
        .post("https://free-portfoilo-backend.onrender.com/register", {
          name: state.name,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          let data = res.data;
          setType("signIn");
          localStorage.setItem("user", JSON.stringify(data?.result));
          localStorage.setItem("token", JSON.stringify(data?.token));
          state.name = "";
          state.email = "";
          state.password = "";
          setState({ ...state })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form >
        <h1>Create Account</h1>
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
        {/* <span>or use your email for registration</span> */}
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button onClick={handleSignup}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
