// Create for token expiry

import { jwtDecode } from "jwt-decode";

export const getTokenExpiryTime = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // convert to ms
  } catch (error) {
    return null;
  }
};