import { Fragment } from "react";
import classes from "./SingleClientItem.module.css";
import authHeader from "../services/auth-header";
import axios from "axios";
import { useParams } from "react-router-dom";


const SingleClientItem = (props) => {
  const { pid } = useParams();
  // const API = "http://localhost:8090/customers/invoices/invsCust"+pid;
  const API = "https://ecoliving-e05afad0acd8.herokuapp.com/customers/invoices/invsCust"+pid;


  function download () {

  axios({
    url: API,
    method: 'GET',
    responseType: 'blob', // Important
    headers: authHeader()
  }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", pid+".pdf");
      document.body.appendChild(link);
      link.click()
  });
}

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
        <div className={classes.mealfritem}>
          <button onClick={download} className={classes.button}>Print Invoices</button>
        </div>
      </section>
    </Fragment>
  );
};

export default SingleClientItem;
