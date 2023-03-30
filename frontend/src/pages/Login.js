import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const userLoginHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:3000/user_login",
      values
    );
    if (!data.status) {
      toast.error(data.msg, toastOptions);
    } else {
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };
  return (
    <>
      <Container className="w-25 h-100 bg-light m-auto mt-5">
        <h1 className="text-center">Sign Up</h1>
        <Form onSubmit={userLoginHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          {/* <div className="text-decoration-none mt-2 text-center">
            <Link to="/forgotPassword">Forgot Password</Link>
          </div> */}
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </div>

          {/* <p>
            Don't have an account ? <Link to="/register">Sign In</Link>
          </p> */}
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
