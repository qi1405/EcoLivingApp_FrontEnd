import { Fragment } from "react";
import classes from "./ClientItem.module.css";
import { useNavigate } from "react-router-dom";

const ClientItem = (props) => {
  const navigate = useNavigate();

  const viewClientClicked = () => {
    navigate(`/clients/${props.pid}`);
  };
  return (
    <Fragment>
      <li className={classes.meal}>
        <div className={classes.mealitem}>
          <h3>{props.Name}</h3>
          <div>{props.Surname}</div>
          <div className={classes.balance}>{props.Balance}</div>
        </div>
        <div className={classes.mealitem}>
          <h3>{props.Address}</h3>
          <div>{props.Area}</div>
          <div>{props.City}</div>
        </div>
        <div className={classes.mealitem}>
          <h3>{props.CustomerNumber}</h3>
          <div>{props.CustomerType}</div>
          <div>{props.Active}</div>
        </div>
        <div className={classes.form}>
          <button onClick={viewClientClicked} type="button">
            Go To Client
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default ClientItem;
