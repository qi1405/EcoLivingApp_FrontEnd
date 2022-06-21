import classes from "./Invoicing.module.css";

const Invoicing = () => {
  return (
    <section className={classes.container}>
      <section className={classes.headrow}>
        <div>
          <h3>All Clients</h3>
        </div>
        <div>
          <h3>Active Clients</h3>
        </div>
        <div>
          <h3>Seasonal Clients</h3>
        </div>
        <div>
          <h3>Invoicing</h3>
        </div>
      </section>
      <section className={classes.itemrow}>
        <div>
          <button type="button">Generate Invoices</button>
        </div>
        <div>
          <button type="button">Generate Invoices</button>
        </div>
        <div>
          <button type="button">Generate Invoices</button>
        </div>
        <div>
          <button type="button">Generate Invoices</button>
        </div>
      </section>
    </section>
  );
};

export default Invoicing;
