import React, {useState, useEffect} from 'react';
import {fetchTransactions} from './services/transactions';
import './App.css';
import Transactions from './views/transactions/Transactions';
import Transfer from './views/transfer/Transfer'

const accounts = [
  "EUR",
  "USD",
  "GBP"
].map(account => (
  <option value={account} key={account}>{account}</option>
));

const App = () => {
  const [selectedAccount, setSelectedAccount] = useState('EUR');
  const [transactions, setTransactions] = useState();
  useEffect(() => {
      fetchTransactions().then((result) => {
        setTransactions(result);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Accounts:
        <select onChange={e => setSelectedAccount(e.target.value)}>
         {accounts}
        </select>
      </header>
      <Transfer />
      <Transactions selectedAccount={selectedAccount} list={transactions} />
    </div>
  );
}

export default App;
