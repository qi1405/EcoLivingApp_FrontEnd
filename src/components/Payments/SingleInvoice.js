import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./SingleInvoice.module.css";
import SingleInvoiceLeftItems from "./SingleInvoiceLeftItems";
import SingleInvoiceRightItems from "./SingleInvoiceRightItems";
import EventBus from "../common/EventBus";
import authHeader from "../services/auth-header";
import axios from "axios";
import Card from "../UI/Card";
import PaymentStatus from "./PaymentStatus";

const SingleInvoice = (props) => {
  const { pid, id } = useParams();
  const API = "http://localhost:8090/customers/invoices/invs"+id;

  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState([]);

  // const API_MAIN = "https://backend-jpapp.herokuapp.com/";
  const API_MAIN = "http://localhost:8090/";

  const getSingleInvoice = () => {
    return axios.get(API_MAIN + `data/customers/invoices/${id}`, {
      headers: authHeader(),
    });
  };

  const getSingleCustomer = () => {
    return axios.get(API_MAIN + `data/customer/${pid}`, {
      headers: authHeader(),
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getSingleInvoice().then(
      (response) => {
        setInvoice(response.data);
        const responseData = response.data;
        const loadedInvoice = [];

        for (const key in responseData) {
          loadedInvoice.push({
            key: responseData[key].pid,
            InvoiceNumber: responseData[key].invoiceNumber,
            Credit: responseData[key].credit,
            Debit: responseData[key].debit,
            MonthOfPayment: responseData[key].monthOfPayment,
            DateOfPayment: responseData[key].dateOfPayment,
            PaymentPeriod: responseData[key].paymentPeriod,
            Operator: responseData[key].operator,
            Paid: responseData[key].paied,
            Printed: responseData[key].printed,
            IsInvoice: responseData[key].isInvoice,
            Id: responseData[key].pid,
          });
        }
        setInvoice(loadedInvoice);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setInvoice(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );

    getSingleCustomer().then(
      (response) => {
        setCustomer(response.data);
        const responseCust = response.data;
        const loadedCustomer = [];

        for (const key in responseCust) {
          loadedCustomer.push({
            key: responseCust[key].id,
            ID: responseCust[key].id,
            Name: responseCust[key].name,
            Surname: responseCust[key].surname,
            Balance: responseCust[key].credit - responseCust[key].debit,
            Address: responseCust[key].address,
            Area: responseCust[key].area,
            City: responseCust[key].city,
            CustomerNumber: responseCust[key].customerNumber,
            CustomerType: responseCust[key].customerTypeID,
            Active: responseCust[key].enabled,
          });
        }
        setCustomer(loadedCustomer);
        setIsLoading(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setCustomer(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const invoiceLeftItems = customer.map((cust) => (
    <SingleInvoiceLeftItems
      key={cust.ID}
      id={cust.ID}
      customerNumber={cust.CustomerNumber}
      name={cust.Name}
      surname={cust.Surname}
    />
  ));

  const invoiceRightItems = invoice.map((inv) => (
    <SingleInvoiceRightItems
      key={inv.id}
      id={inv.key}
      invoiceNumber={inv.InvoiceNumber}
      invoiceMonth={inv.MonthOfPayment}
      invoiceDate={inv.DateOfPayment}
    />
  ));

  const paymentStatus = invoice.map((inv) => (
    <PaymentStatus key={inv.Id} id={inv.Id} isPaid={inv.Paid} />
  ));


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
      link.setAttribute("download", id+".pdf");
      document.body.appendChild(link);
      link.click()
  });
}

  return (
    <>
      <section className={classes.container}>
        <div className={classes.prova1}>
          <div className={classes.fieldnames}>
            <h3>Customer ID:</h3>
            <h3>Customer Number:</h3>
            <h3>Customer Name:</h3>
            <h3>Customer Surname:</h3>
          </div>
          <div className={classes.fielditems}>{invoiceLeftItems}</div>
          <div className={classes.border}></div>
          <div className={classes.fieldnames}>
            <h3>Invoice ID:</h3>
            <h3>Invoice Number:</h3>
            <h3>Invoice MoP:</h3>
            <h3>Invoice DoP:</h3>
          </div>
          <div className={classes.fielditems}>{invoiceRightItems}</div>
        </div>
      </section>
      <section className={classes.container}>
        <div className={classes.prova1}>
          <h3>Payment status: {paymentStatus}</h3>
        </div>
      </section>
      <section className={classes.container}>
        <div className={classes.prova1}>
          <button onClick={download} className={classes.button}>Generate Invoice</button>
        </div>
      </section>
    </>
  );
};

export default SingleInvoice;
