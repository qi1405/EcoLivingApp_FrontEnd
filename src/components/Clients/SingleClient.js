import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "../Clients/SingleClient.module.css";
import Card from "../UI/Card";
import SingleClientItem from "../Clients/SingleClientItem";
import ClientHeadColumn from "../Clients/ClientHeadColumn";
import LoadingSpinner from "../UI/LoadingSpinner";
import Invoices from "../Payments/Invoices";
import { useNavigate, Routes, Route } from "react-router-dom";

const SingleClient = (props) => {
  const { pid } = useParams();

  const [clients, setClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [loadInvoices, setLoadInvoices] = useState("Load");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://backend-jpapp.herokuapp.com//customers/${pid}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      console.log(responseData)

      const loadedClient = [];

      for (const key in responseData) {
        loadedClient.push({
          key: responseData[key].id,
          SName: responseData[key].name,
          SSurname: responseData[key].surname,
          SBalance: responseData[key].debit - responseData[key].credit,
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
    };

    fetchClient().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
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

  if (httpError) {
    return (
      <section className={classes.ClientsError}>
        <p>{httpError}</p>
      </section>
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
      setLoadInvoices("Hide");
    } else {
      navigate(`/clients/${pid}`);
      setLoadInvoices("Load");
    }
  };

  return (
    <Fragment>
      <p>This is the page of Customer id. {pid}</p>
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
              <Route path="invoices" element={<Invoices />} />
            </Routes>
          </div>
        </Card>
      </section>
    </Fragment>
  );
};

export default SingleClient;
