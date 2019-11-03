import React, {useState} from 'react';
import './Transfer.css';
import {useFormik} from 'formik';
import {accounts} from '../../const/Accounts';
import {makeTransfer} from '../../services/transactions';

const accountsOptions = accounts.map(account => (
  <option value={account} key={account}>{account}</option>
))

const validate = values => {
  const errors = {};
  if (!values.amount) {
    errors.amount = 'Required';
  }

  if (values.fromAccount === values.toAccount) {
    errors.toAccount = 'Cannot send to the same account';
  }

  return errors;
};

const Tansfer = () => {
  const [transferStatus, setTransferStatus] = useState();

  const formik = useFormik({
    initialValues: {      
      fromAccount: 'EUR', // TODO: shold be first account
      toAccount: 'GBP', // TODO: should be second account
      amount: '',
    },
    validate,
    onSubmit: values => {
      const stringValues = JSON.stringify(values, null, 2)
      console.log(stringValues);
      setTransferStatus('Sending...');

      makeTransfer()
      // fetch('/submit', {body: stringValues, method: 'POST'})
        .then(res => {
          setTransferStatus(res.ok ? 
            `Sent ${values.amount} ${values.fromAccount}` : 'Transfer failed')
          formik.setSubmitting(false)
        });
    },
  });  

  return (
      <div className="transfer">
        Move money:
        <form onSubmit={formik.handleSubmit}>
          <div className="formItem">
            <label className="label" htmlFor="fromAccount">From: </label>
            <select 
              id="fromAccount"
              name="fromAccount" 
              onChange={formik.handleChange}
              value={formik.values.fromAccount}>
              {accountsOptions}
            </select>
          </div>
          <div className="formItem">
            <label className="label" htmlFor="toAccount">To: </label>
            <select 
              id="toAccount"
              name="toAccount" 
              onChange={formik.handleChange}
              value={formik.values.toAccount}>
              {accountsOptions}
            </select>
            {formik.touched.toAccount && formik.errors.toAccount ? <div className="error">{formik.errors.toAccount}</div> : null}
          </div>
          <div className="formItem">
            <label className="label" htmlFor="amount">Amount: </label>
            <input
              id="amount"
              name="amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount ? <div className="error">{formik.errors.amount}</div> : null}
          </div>
          <button type="submit" disabled={formik.isSubmitting}>Transfer</button>
        </form>
        {transferStatus}
      </div>
  );
}

export default Tansfer;
