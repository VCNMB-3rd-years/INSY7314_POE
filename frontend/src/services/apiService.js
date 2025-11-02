// import our singleton for axios
import axios from '../interfaces/axiosInstance.js'

//Transaction endpoints
// GET all the transactions from the API
export const getTransactions = () => axios.get('/transaction/getTransactions');

// GET a specific transaction
export const getTransaction = (id) => axios.get(`/transaction/${id}`);

// POST request, to create a new transaction
export const createTransaction = (transactionData, token) => {
  return axios.post("/transaction/createTransaction", transactionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// PUT request, to update an existing transaction
export const updateStatus = (id, transactionData) => axios.put(`/transaction/${id}`, transactionData);

//Customer endpoints
// PUT request, to update an existing customer
export const updateCustomer = (id, customerData) => axios.put(`/customer/${id}`, customerData);

// POST to register a user
export const register = (customerData) => axios.post('/auth/register', customerData);

// POST to login a user
export const login = (customerData) => axios.post('/auth/login', customerData);

// GET logout credentials
export const logout = (token) => {
  return axios.get("/auth/logout", {
    headers: { Authorization: `Bearer ${token}` },
  });
};