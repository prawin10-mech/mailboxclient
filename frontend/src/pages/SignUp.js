import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://localhost:3000";

const SignUp = () => {
  const [otpSend, setOtpSend] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

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

  const verifyOtp = async () => {
    const { email, otp } = values;
    const response = await axios.post(baseUrl + "/verify_otp", { email, otp });
    if (response.data.status === false) {
      toast.error(response.data.msg, toastOptions);
    } else {
      navigate("/");
    }
  };

  const userSignUpHandler = async (e) => {
    e.preventDefault();
    if (handleValidate()) {
      const response = await axios.post(baseUrl + "/user_signup", values);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      } else {
        setOtpSend(true);
      }
    }
  };

  const handleValidate = () => {
    const { email, password, confirmPassword } = values;

    //validate email
    if (email === "" || email === null || email === undefined) {
      toast.error("Please enter valid Email", toastOptions);
      return false;
    }
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter valid Email Address", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same", toastOptions);
      return false;
    }
    if (password === "" || confirmPassword === "") {
      toast.error("Please enter valid Password", toastOptions);
      return false;
    }
    if (password < 8) {
      toast.error("Please enter valid Password", toastOptions);
      return false;
    }

    return true;
  };
  return (
    <>
      <Container className="w-25 h-100 bg-light m-auto mt-5">
        <h1 className="text-center">Sign Up</h1>
        <Form onSubmit={userSignUpHandler}>
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
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          {otpSend && (
            <Form.Group controlId="otp">
              <Form.Label>Confirm Password: </Form.Label>
              <Form.Control
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          )}
          {/* <div className="text-decoration-none mt-2 text-center">
            <Link to="/forgotPassword">Forgot Password</Link>
          </div> */}
          <div className="d-flex justify-content-center">
            {!otpSend && (
              <Button variant="primary" type="submit" className="mt-3">
                Sign Up
              </Button>
            )}
            {otpSend && (
              <Button
                variant="primary"
                type="button"
                onClick={verifyOtp}
                className="mt-3"
              >
                Verify
              </Button>
            )}
          </div>

          {/* <p>
            Don't have an account ? <Link to="/register">Sign In</Link>
          </p> */}
        </Form>
        <p>
          Already have an account ? <Link to="/">Login</Link>
        </p>
      </Container>
      <ToastContainer />
    </>
  );
};

export default SignUp;
