import mockTransactions from '../mocks/mockTransactions'

export const fetchTransactions = () => new Promise((resolve) => {
    setTimeout(() => resolve(mockTransactions), 3000) 
});

export const makeTransfer = () => new Promise((resolve) => {
    setTimeout(() => resolve({ok: true}), 3000) 
});
