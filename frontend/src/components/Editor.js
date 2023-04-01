import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import useToken from "../utils/useToken";

import { useDispatch } from "react-redux";
import { mailActions } from "../store/mail";

const MyEditor = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
  });
  const [value, setValue] = useState("");
  const [cc, setCc] = useState(false);
  const formRef = useRef(null);

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

  const ccHandle = () => {
    setCc(!cc);
  };

  const SendEmailHandler = async (e) => {
    e.preventDefault();
    const token = useToken();
    console.log(values);
    if (handleValidate()) {
      let msg = value.replaceAll("<p>", "");
      msg = msg.replaceAll("</p>", "");
      const obj = { ...values, message: msg };
      console.log(obj);
      const { data } = await axios.post(
        "http://localhost:3000/send_mail",
        obj,
        {
          headers: { Authorization: token },
        }
      );
      if (data.status) {
        const { data } = await axios.get(
          "http://localhost:3000/getUnreadMailsCount",
          { headers: { Authorization: token } }
        );
        dispatch(mailActions.getUnreadMailsCount({ count: data.count }));
      }

      if (data.status) {
        setValues({ to: "", cc: "", bcc: "", subject: "" });
        formRef.current.reset();
        toast.success("Mail send Successfully", toastOptions);

        const { data } = await axios.get("http://localhost:3000/getAllMails", {
          headers: { Authorization: token },
        });
        dispatch(mailActions.getAllMails({ mails: data.mails }));
      }
      console.log(data);
    }
  };

  const handleValidate = () => {
    const { to, subject } = values;

    //validate email
    if (to === "" || to === null || to === undefined) {
      toast.error("Please enter Email", toastOptions);
      return false;
    }
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
    if (!emailRegex.test(to)) {
      toast.error("Please enter valid Email Address", toastOptions);
      return false;
    }

    if (subject === "") {
      toast.error("Please enter Subject", toastOptions);
      return false;
    }
    if (value === "") {
      toast.error("Please enter message you want to send", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <div className="position-fixed right-0 bottom-0">
      <Container className="">
        <Form onSubmit={SendEmailHandler} ref={formRef}>
          <div>
            <Form.Group controlId="to">
              <Form.Label>To: </Form.Label>
              <Form.Control
                type="text"
                name="to"
                placeholder="Enter Email"
                onChange={(e) => handleChange(e)}
              />
              <Button
                onClick={ccHandle}
                className="bg-light text-primary border"
              >
                CC/BCC
              </Button>
            </Form.Group>
          </div>
          {cc && (
            <>
              <Form.Group controlId="cc">
                <Form.Label>CC: </Form.Label>
                <Form.Control
                  type="text"
                  name="cc"
                  placeholder="Enter cc"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="bcc">
                <Form.Label>Bcc: </Form.Label>
                <Form.Control
                  type="text"
                  name="bcc"
                  placeholder="Enter Bcc"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </>
          )}
          <Form.Group controlId="subject" className="mb-2">
            <Form.Label>Subject: </Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Enter Subject"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </Form.Group>
          <Button type="submit">Send</Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default MyEditor;
