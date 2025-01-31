import jwtDecode from 'jwt-decode';

const isAuthenticated = () => {
  let authToken = window.localStorage.getItem('authToken');
  if (!authToken) {
    return false;
  }
  let decodedToken = jwtDecode(authToken.split(' ')[1]);
  return Date.now() < decodedToken.exp * 1000;
};

export const initLogout = () => {
  window.localStorage.removeItem("authToken");
};

export const getName = () => {
  let authToken = window.localStorage.getItem('authToken');
  if (!authToken) {
    return '';
  }
  let decodedToken = jwtDecode(authToken.split(' ')[1]);
  return decodedToken.firstName + ' ' + decodedToken.lastName;
};

export default isAuthenticated;
