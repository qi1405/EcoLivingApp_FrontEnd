import classes from "./ClientHeadColumn.module.css";

const ClientHeadColumn = () => {
  return (
    <section className={classes.mealfr}>
      <div className={classes.mealfritem}>
        <div>Name</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Surname</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Balance</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Address</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Area</div>
      </div>
      <div className={classes.mealfritem}>
        <div>City</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Cust Nr</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Cust type</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Active?</div>
      </div>
      <div className={classes.mealfritem}>
        <div>PID</div>
      </div>
      <div className={classes.mealfritem}>
        <div>Date Created</div>
      </div>
    </section>
  );
};

export default ClientHeadColumn;
