import classes from "./ClientsHeadRow.module.css";

const ClientsHeadRow = () => {
    return (
      <section className={classes.mealfr}>
        <div className={classes.mealfritem}>
          <h3>Name</h3>
          <div className={classes.description}>Surname</div>
          <div className={classes.balance}>Balance</div>
        </div>
        <div className={classes.mealfritem}>
          <h3>Address</h3>
          <div className={classes.description}>Area</div>
          <div>City</div>
        </div>
        <div className={classes.mealfritem}>
          <h3>Cust Nr</h3>
          <div className={classes.description}>Cust type</div>
          <div>Active?</div>
        </div>
      </section>
    );
}

export default ClientsHeadRow;