import Modal from "../UI/Modal";
import classes from "./ClientCart.module.css";

const ClientCart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[
        {
          key: "c1",
          CID: "c1",
          Name: "Aqif",
          Surname: "Aqifi",
        },
      ].map((item) => (
        <li>{item.Name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>The Balance</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Go To Client</button>
      </div>
      <div></div>
    </Modal>
  );
};

export default ClientCart;
