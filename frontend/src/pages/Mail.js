import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useToken from "../utils/useToken";
import "./Mail.css";

const Mail = () => {
  const { id } = useParams();
  const token = useToken();
  const [mail, setMail] = useState("");

  const getMailDetails = async () => {
    const { data } = await axios.post(
      "http://localhost:3000/getMail",
      { id },
      { headers: { Authorization: token } }
    );
    let show = (
      <div key={data.mail._id} className="container  m-auto">
        <div className="mailDetails">
          <p>From: {data.mail.from}</p>
          <p>CC: {data.mail.cc}</p>
          <p>Bcc: {data.mail.bcc}</p>
        </div>
        <div>
          <p>Subject: {data.mail.subject}</p>
          <p>{data.mail.message}</p>
        </div>
      </div>
    );
    setMail(show);
  };

  useEffect(() => {
    getMailDetails();
  });

  return <div>{mail}</div>;
};

export default Mail;
