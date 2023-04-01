import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import useToken from "../utils/useToken";
import { mailActions } from "../store/mail";
import { useNavigate } from "react-router-dom";
import "./inbox.css";

const Inbox = () => {
  const mails = useSelector((state) => state.mail.mails);
  const token = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteMailHandler = async (id) => {
    const { data } = await axios.post("http://localhost:3000/deleteMail", {
      id,
    });

    if (data.status) {
      const { data } = await axios.get("http://localhost:3000/getAllMails", {
        headers: { Authorization: token },
      });
      dispatch(mailActions.getAllMails({ mails: data.mails }));
    }
    if (data.status) {
      const { data } = await axios.get(
        "http://localhost:3000/getUnreadMailsCount",
        { headers: { Authorization: token } }
      );
      dispatch(mailActions.getUnreadMailsCount({ count: data.count }));
    }
  };

  const isReadHandle = async (id) => {
    const { data } = await axios.post(
      "http://localhost:3000/mail/readed",
      {
        id,
      },
      { headers: { Authorization: token } }
    );
    console.log(data);
  };
  const allMails = mails.map((mail) => {
    return (
      <Link
        to={`/mail/${mail._id}`}
        key={mail._id}
        onClick={() => isReadHandle(mail._id)}
      >
        <div className="d-flex m-auto align-middle border mb-2 hover:bg-primary">
          <div className={mail.isRead ? "" : "dot"}></div>
          <p className="text-bold  px-5">{mail.from}</p>
          <div className="d-flex ">
            <p className="text-bold px-3">{mail.subject}</p>
            <p>{mail.message}</p>
          </div>
          <button
            className="deleteBtn float-end"
            onClick={() => deleteMailHandler(mail._id)}
          >
            Delete
          </button>
        </div>
      </Link>
    );
  });
  return <div>{allMails}</div>;
};

export default Inbox;
