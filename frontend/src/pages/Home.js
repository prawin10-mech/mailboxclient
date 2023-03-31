import React, { useState } from "react";
import Editor from "../components/Editor";
import { Button } from "react-bootstrap";

import { composeMailActions } from "../store/composeMail";
import { useDispatch, useSelector } from "react-redux";

import Inbox from "../components/Inbox";

const Home = () => {
  const compose = useSelector((state) => state.composeMail.isOpened);
  const [inbox, setInbox] = useState(false);
  const mails = useSelector((state) => state.mail.mails);
  const dispatch = useDispatch();
  const composeBtnHandler = () => {
    dispatch(composeMailActions.toggleCompose());
  };

  const activateInbox = () => {
    setInbox(true);
  };
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
            Inbox <span>{mails.length}</span>
          </Button>
        </div>
        {inbox && <Inbox />}
      </div>
      {compose && <Editor />}
    </div>
  );
};

export default Home;
