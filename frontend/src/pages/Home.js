import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "../utils/useToken";
import Editor from "../components/Editor";
import { Button } from "react-bootstrap";

import { composeMailActions } from "../store/composeMail";
import { useDispatch, useSelector } from "react-redux";

import Inbox from "../components/Inbox";
import { mailActions } from "../store/mail";

const Home = () => {
  const compose = useSelector((state) => state.composeMail.isOpened);
  const [inbox, setInbox] = useState(false);
  const mails = useSelector((state) => state.mail.mails);
  const count = useSelector((state) => state.mail.totalUnreadMails);
  const token = useToken();
  const dispatch = useDispatch();
  const composeBtnHandler = () => {
    dispatch(composeMailActions.toggleCompose());
  };

  const activateInbox = () => {
    setInbox(true);
  };

  const getAllMails = async () => {
    const { data } = await axios.get("http://localhost:3000/getAllMails", {
      headers: { Authorization: token },
    });
    dispatch(mailActions.getAllMails({ mails: data.mails }));
  };

  const getUnreadMailsCount = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/getUnreadMailsCount",
      { headers: { Authorization: token } }
    );
    dispatch(mailActions.getUnreadMailsCount({ count: data.count }));
  };

  useEffect(() => {
    getAllMails();
    getUnreadMailsCount();
  }, []);
  return (
    <div className="w-100">
      <h1>MailBox</h1>
      <div className="d-flex">
        <div className="w-25">
          <Button
            onClick={composeBtnHandler}
            className={compose ? "btn-danger" : "btn-primary"}
          >
            {compose ? "X" : "Compose Mail"}
          </Button>
          <br />
          <Button className="mt-2" onClick={activateInbox}>
            Inbox <span>{count}</span>
          </Button>
        </div>
        {inbox && <Inbox />}
      </div>
      {compose && <Editor />}
    </div>
  );
};

export default Home;
