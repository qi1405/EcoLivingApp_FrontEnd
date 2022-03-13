import { Fragment } from "react";
import classes from "./SingleClientItem.module.css";

const SingleClientItem = (props) => {
  return (
    <Fragment>
      <section className={classes.meal}>
        <div className={classes.mealfritem}>
          <div>{props.SName}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SSurname}</div>
        </div>
        <div className={classes.mealfritem}>
          <div className={classes.balance}>{props.SBalance}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SAddress}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SArea}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SCity}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SCustomerNumber}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SCustomerType}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SActive}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Spid}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.SDateCreated}</div>
        </div>
      </section>
    </Fragment>
  );
};

export default SingleClientItem;
