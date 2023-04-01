import React from "react";
import { useSelector } from "react-redux";
import "./Mail.css";

const Send = () => {
  const sendedMails = useSelector((state) => state.mail.sendedMails);

  const mails = sendedMails.map((mail) => {
    return (
      <div key={mail._id} className="container m-auto">
        <div className="mailDetails">
          <p>To: {mail.to}</p>
          <p>CC: {mail.cc}</p>
          <p>Bcc: {mail.bcc}</p>
        </div>
        <div>
          <p>Subject: {mail.subject}</p>
          <p>{mail.message}</p>
        </div>
      </div>
    );
  });
  return <div>{mails}</div>;
};

export default Send;
