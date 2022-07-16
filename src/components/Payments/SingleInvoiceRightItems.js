const SingleInvoiceRightItems = (props) => {
  return (
    <>
      <h3>{props.id}</h3>
      <h3>{props.invoiceNumber}</h3>
      <h3>{props.invoiceMonth}</h3>
      <h3>{props.invoiceDate}</h3>
    </>
  );
};

export default SingleInvoiceRightItems;
