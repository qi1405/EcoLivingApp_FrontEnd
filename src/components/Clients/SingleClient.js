import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "../Clients/SingleClient.module.css";
import Card from "../UI/Card";
import SingleClientItem from "../Clients/SingleClientItem";
import ClientHeadColumn from "../Clients/ClientHeadColumn";
import LoadingSpinner from "../UI/LoadingSpinner";
import Invoices from "../Payments/Invoices";
import AllInvoices from "../Payments/AllInvoices";
import { useNavigate, Routes, Route } from "react-router-dom";
import EventBus from "../common/EventBus";
import authHeader from "../services/auth-header";
import axios from "axios";

const SingleClient = (props) => {
  const { pid } = useParams();

  const [clients, setClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadInvoices, setLoadInvoices] = useState("Load");
  const navigate = useNavigate();

  const API_MAIN = "http://ecoliving-env-1.eba-dgcswt2k.eu-north-1.elasticbeanstalk.com/";
  // const API_MAIN = "http://localhost:8090/";

  const getSingleCustomer = () => {
    return axios.get(API_MAIN + `data/customers/${pid}`, { headers: authHeader() });
  };

  useEffect(() => {
    setIsLoading(true);
    getSingleCustomer().then(
      (response) => {
        setClient(response.data)
        const responseData = response.data;

      const loadedClient = [];

      for (const key in responseData) {
        loadedClient.push({
          key: responseData[key].id,
          SName: responseData[key].name,
          SSurname: responseData[key].surname,
          SBalance: responseData[key].credit - responseData[key].debit,
          SAddress: responseData[key].address,
          SArea: responseData[key].area,
          SCity: responseData[key].city,
          SCustomerNumber: responseData[key].customerNumber,
          SCustomerType: responseData[key].customerTypeID,
          SActive: responseData[key].enabled,
          Spid: responseData[key].id,
          SDateCreated: responseData[key].dateCreated,
        });
      }
      setClient(loadedClient);
      setIsLoading(false);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setClient(_content);

      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    });
  }, []);

  if (isLoading) {
    return (
      <Fragment>
        <section className={classes.ClientsLoading}>
          <p>Loading...</p>
        </section>
        <LoadingSpinner className={classes.Spinner} />
      </Fragment>
    );
  }

  const clientList = clients.map((client) => (
    <SingleClientItem
      key={client.key}
      Spid={client.key}
      SCustomerNumber={client.SCustomerNumber}
      SName={client.SName}
      SSurname={client.SSurname}
      SAddress={client.SAddress}
      SArea={client.SArea}
      SZone={client.SZone}
      SCity={client.SCity}
      SType={client.SType}
      SActive={client.SActive}
      SBalance={client.SBalance}
      SCustomerType={client.SCustomerType}
      SDateCreated={client.SDateCreated}
    />
  ));

  const invoicesLoadHide = () => {
    if (loadInvoices === "Load") {
      navigate(`/clients/${pid}/invoices`);
      setLoadInvoices("Load all");
    } else if (loadInvoices === "Load all") {
      navigate(`/clients/${pid}/allinvoices`);
      setLoadInvoices("Hide");
    } else {
      navigate(`/clients/${pid}`);
      setLoadInvoices("Load");
    }
  };

  return (
    <Fragment>
      <p style={{textAlign: 'center'}}>This is the page of Customer id. {pid}</p>
      <section className={classes.container}>
        <Card>
          <div>
            <ClientHeadColumn />
          </div>
          <div>
            <ul>{clientList}</ul>
          </div>
          <div>
            <button onClick={invoicesLoadHide} className={classes.button}>
              {loadInvoices} Invoices
            </button>
          </div>
          <div>
            <Routes>
              <Route path="invoices/*" element={<Invoices />} />
              <Route path="allinvoices/*" element={<AllInvoices />} />
            </Routes>
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default SingleClient;
