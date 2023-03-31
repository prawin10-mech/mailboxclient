import { useSelector } from "react-redux";

const Inbox = () => {
  const mails = useSelector((state) => state.mail.mails);
  const allMails = mails.map((mail) => {
    return (
      <div key={mail._id} className="d-flex">
        <p className="text-bold  px-5">{mail.from}</p>
        <div className="d-flex ">
          <p className="text-bold px-3">{mail.subject}</p>
          <p>{mail.message}</p>
        </div>
      </div>
    );
  });
  return <div>{allMails}</div>;
};

export default Inbox;
