import React from 'react';
import {dateRenderer} from './cellRenderers'

const Transactions = ({selectedAccount, list}) => {


  return (
    <div>
      Transactions:
      {list ?
      <table>
        <thead>
        <tr>
          <th>Timestamp</th>
          <th>Action (credit/debit)</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Currency</th>
        </tr>
        </thead>
        <tbody>
        {list
        .filter(transaction => transaction.currency === selectedAccount)
        .map((transaction => (
          <tr key={transaction.timestamp}>
          <td>{dateRenderer(transaction.timestamp)}</td>
          <td>{transaction.action}</td>
          <td>{transaction.description}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.currency}</td>
          </tr>
        )))}
        </tbody>
      </table> : <div>Loading...</div>}
    </div>
  )
}

export default Transactions;