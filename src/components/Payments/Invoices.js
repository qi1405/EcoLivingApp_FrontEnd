import InvoicesHeadRow from "./InvoicesHeadRow";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from './Invoices.module.css';
import InvoiceItems from "./InvoiceItems";

const Invoices = (props) => {
  const { pid } = useParams();

  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      const responseInv = await fetch(
        `https://backend-jpapp.herokuapp.com//${pid}/invoices`
      );

      if (!responseInv.ok) {
        throw new Error("Something went wrong!");
      }

      const responseDataInv = await responseInv.json();

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
    };
        fetchInvoices().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
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

  if (httpError) {
    return (
      <section><p>{httpError}</p></section>
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
