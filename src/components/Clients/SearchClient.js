import { useRef } from "react";
import ClientItem from "./ClientItem";
import ClientsHeadRow from "./ClientsHeadRow";

const SearchClient = (props) => {
  const inputEl = useRef("");

  const clientsList = props.clients.map((client) => (
    <ClientItem
      onClick={props.onClick}
      key={client.key}
      pid={client.key}
      CustomerNumber={client.CustomerNumber}
      Name={client.Name}
      Surname={client.Surname}
      Address={client.Address}
      Area={client.Area}
      Zone={client.Zone}
      City={client.City}
      Type={client.Type}
      Active={client.Active}
      Balance={client.Balance}
      CustomerType={client.CustomerType}
    />
  ));

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Clients"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div>
        <ClientsHeadRow />
      </div>
      <div>
        <ul>{clientsList.length > 0 ? clientsList : "No clients found!"}</ul>
      </div>
    </div>
  );
};

export default SearchClient;
