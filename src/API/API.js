import axios from 'axios';
import { REACT_APP_URL } from '../global_variable';

// get All data employes with filter
export const getDataEmployers = async (firstName) => {
  return await axios.get(`${REACT_APP_URL}/?firstName=${firstName}`);
};

// get employee data by userId
export const getDataById = async (userId) => {
  return await axios.get(`${REACT_APP_URL}/${userId}`);
};

// post data employee
export const registerEmployee = async (payload) => {
  return await axios.post(`${REACT_APP_URL}`, payload);
};

// update data employee by userId
export const updateDatabyId = async (userId, payload) => {
  return await axios.patch(`${REACT_APP_URL}/update/${userId}`, payload);
};

// delete user data
export const deleteUserData = async (userId) => {
  return await axios.delete(`${REACT_APP_URL}/${userId}`);
};
