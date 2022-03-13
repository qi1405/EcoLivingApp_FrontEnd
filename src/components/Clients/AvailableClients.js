import { Fragment, useEffect, useState } from "react";
import classes from "./AvailableClients.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import SearchClient from "./SearchClient";

const AvailableClients = (props) => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newClientsList = clients.filter((client) => {
        return Object.values(client)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newClientsList);
    }
    else {
      setSearchResults(clients);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8090/customers");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedClients = [];

      for (const key in responseData) {
        loadedClients.push({
          key: responseData[key].id,
          Name: responseData[key].name,
          Surname: responseData[key].surname,
          Balance: responseData[key].debit - responseData[key].credit,
          Address: responseData[key].address,
          Area: responseData[key].area,
          City: responseData[key].city,
          CustomerNumber: responseData[key].customerNumber,
          CustomerType: responseData[key].customerTypeID,
          Active: responseData[key].enabled,
        });
      }
      // console.log(responseData[0].pid)
      setClients(loadedClients);
      setIsLoading(false);
    };

    fetchClients().catch((error) => {
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

  return (
    <section className={classes.container}>
      <Card>
        <SearchClient
          {...props}
          clients={searchTerm.length < 1 ? clients : searchResults}
          term={searchTerm}
          searchKeyword={searchHandler}
        />
      </Card>
    </section>
  );
};

export default AvailableClients;
