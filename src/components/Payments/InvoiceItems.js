import { Fragment } from "react";
import classes from './InvoiceItems.module.css';
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import SingleInvoice from "./SingleInvoice";

const InvoiceItems = (props) => {
  const { pid } = useParams();
  const navigate = useNavigate();

  const getSingleInvoice = () => {
    navigate(`/clients/${pid}/invoices/${props.Pid}`)
  };

  return (
    <Fragment>
      <section className={classes.meal}>
        <div className={classes.mealfritem}>
          <div>{props.Pid}</div>
        </div>
        <div className={classes.invoicenr}>
          <div>{props.InvoiceNumber}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.MonthOfPayment}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.DateOfPayment}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Credit}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Debit}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.PaymentPeriod}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Printed}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Paid}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.IsInvoice}</div>
        </div>
        <div className={classes.mealfritem}>
          <div>{props.Operator}</div>
        </div>
        <div className={classes.mealfritem}>
          <button onClick={getSingleInvoice} className={classes.button}>View</button>
        </div>
        <div>
            <Routes>
              <Route path={`invoices/${props.Pid}`} element={<SingleInvoice />} />
            </Routes>
          </div>
      </section>
    </Fragment>
  );
};

export default InvoiceItems;
