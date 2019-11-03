import React from 'react';
import {shallow} from 'enzyme';
import Transactions from './Transactions';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('transaction component', () => {
    it('renders loading... when list is not provided', () => {
        const transactionsWithoutList = shallow(<Transactions />);
      
        expect(transactionsWithoutList.childAt(1).text()).toEqual('Loading...');
    });

    it('does not render loading... when empty list provided but renders header', () => {
        const transactions = shallow(<Transactions list={[]} />);
      
        expect(transactions.childAt(1).text()).not.toEqual('Loading...');
        expect(transactions.find('thead')).toHaveLength(1);
    });

    it('does not render loading... when empty list provided', () => {
        const transaction = {
            timestamp:"2018-12-24T17:31:46Z",
            action:"debit",
            description:"Right-sized heuristic hardware",
            amount:68,
            currency:"EUR"
        };
        const transactions = shallow(<Transactions list={[transaction]} />);
      
        expect(transactions.find('tbody')).toHaveLength(1);
    });
})


