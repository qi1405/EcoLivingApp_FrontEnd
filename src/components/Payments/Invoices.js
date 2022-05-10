import InvoicesHeadRow from "./InvoicesHeadRow";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from './Invoices.module.css';
import InvoiceItems from "./InvoiceItems";
import EventBus from "../common/EventBus";
import authHeader from "../services/auth-header";
import axios from "axios";

const Invoices = (props) => {
  const { pid } = useParams();

  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const API_MAIN = "https://backend-jpapp.herokuapp.com/";

  const getInvoices = () => {
    return axios.get(API_MAIN + `data/customers/${pid}/invoices`, { headers: authHeader() });
  };

  useEffect(() => {
    setIsLoading(true);
    getInvoices().then(
      (response) => {
        setInvoices(response.data)
        const responseDataInv = response.data;

      const loadedInvoices = [];

      for (const key in responseDataInv) {
        loadedInvoices.push({
          key: responseDataInv[key].pid,
          InvoiceNumber: responseDataInv[key].invoiceNumber,
          Credit: responseDataInv[key].credit,
          Debit: responseDataInv[key].debit,

          MonthOfPayment: responseDataInv[key].monthOfPayment,
          DateOfPayment: responseDataInv[key].dateOfPayment,
          PaymentPeriod: responseDataInv[key].paymentPeriod,
          Operator: responseDataInv[key].operator,
          Paid: responseDataInv[key].paied,
          Printed: responseDataInv[key].printed,
          IsInvoice: responseDataInv[key].isInvoice,
          Id: responseDataInv[key].pid,
        });
      }
      setInvoices(loadedInvoices);
      setIsLoading(false);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        setInvoices(_content);

      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    });
  }, []);

  if (isLoading) {
    return (
      <Fragment>
        <section><p>Loading invoices...</p></section>
        <LoadingSpinner />
      </Fragment>
    )
  }

  const invoicesList = invoices.map((invoice) => (
    <InvoiceItems
      key={invoice.key}
      Pid={invoice.key}
      InvoiceNumber={invoice.InvoiceNumber}
      Credit={invoice.Credit}
      Debit={invoice.Debit}
      MonthOfPayment={invoice.MonthOfPayment}
      DateOfPayment={invoice.DateOfPayment}
      PaymentPeriod={invoice.PaymentPeriod}
      Operator={invoice.Operator}
      Paid={invoice.Paid}
      Printed={invoice.Printed}
      IsInvoice={invoice.IsInvoice}
      Id={invoice.Id}
    />
  ));

  return (
    
      <section className={classes.invoices}>
        <div>
          <InvoicesHeadRow />
        </div>
        <div>
          <ul>{invoicesList}</ul>
        </div>
      </section>
    
  );
};

export default Invoices;
