import classes from "./SingleInvoice.module.css";

const SingleInvoiceLeftItems = (props) => {
  return (
    <section className={classes.container}>
      <div className={classes.left}>
        <h3>{props.id}</h3>
        <h3>{props.customerNumber}</h3>
        <h3>{props.name}</h3>
        <h3>{props.surname}</h3>
      </div>
    </section>
  );
};

export default SingleInvoiceLeftItems;
