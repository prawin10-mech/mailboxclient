import React, { useState } from "react";
import Editor from "../components/Editor";
import { Button } from "react-bootstrap";

import { composeMailActions } from "../store/composeMail";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const compose = useSelector((state) => state.composeMail.isOpened);
  const dispatch = useDispatch();
  const composeBtnHandler = () => {
    dispatch(composeMailActions.toggleCompose());
  };
  return (
    <div>
      <h1>MailBox</h1>
      <Button
        onClick={composeBtnHandler}
        className={compose ? "btn-danger" : "btn-primary"}
      >
        {compose ? "X" : "Compose Mail"}
      </Button>
      {compose && <Editor />}
    </div>
  );
};

export default Home;
