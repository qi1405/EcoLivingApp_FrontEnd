import classes from "./InvoicesHeadRow.module.css";


const InvoicesHeadRow = (props) => {

  return (
    <section className={classes.invoiceshead}>
      <div className={classes.invoicesitem}>
        <div>Id</div>
      </div>
      <div className={classes.invoicenritem}>
        <div>Invoice Number</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Month of Payment</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Date of Payment</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Credit</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Debit</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Payment Period</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Printed</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Paid?</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Is Invoice?</div>
      </div>
      <div className={classes.invoicesitem}>
        <div>Operator</div>
      </div>
    </section>
  );
};

export default InvoicesHeadRow;
